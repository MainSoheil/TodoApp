import { useState, useEffect } from 'react';
import SideBar from './Sidebar/Sidebar';
import Header from './Header/Header';
import Content from './Content/Content';
import jalaali from "jalaali-js";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import './App.css'

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [time, setTime] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const getData = (task=null)=>{
    fetch("http://127.0.0.1:5000/api", {
      method: task ? 'post' : 'get',
      ...(task && {'body': JSON.stringify(task)})
    }).then(res => {
        if(!res.ok) throw new Error("Faild to fetch data!!!");
        return res.json();
    }).then(data => {
        console.log("Get Data : ", data);
        if (!task){
          const formatted = data.map(task => {
            const startDate = new DateObject({
              calendar: persian,
              locale: persian_fa,
              date: task.startDate,
            });
            const endDate = new DateObject({
              calendar: persian,
              locale: persian_fa,
              date: task.endDate,
            });
            return {
              id: task.id,
              title: task.title,
              startDate,
              endDate,
              end: false,
              percentage: 0,
              remaining: "",
              visible: true,
            };
          });
          setTasks(formatted);
        };
    }).catch(err => {
        throw new Error(`Faild to fetch data : ${err}`);
    });
  };
  const deleteData = (id)=>{
      fetch("http://127.0.0.1:5000/api/delete",{
        method: "delete",
        body: JSON.stringify({id: id})
      }).catch(e => {throw new Error(`Erorr While deleting ${e}`)} );
      setTasks(prev=>prev.filter(t => t.id !== id));
  }
  useEffect(()=>{
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  useEffect(()=>{
    getData();
    const timer = setInterval(()=>{
      setTime(new Date());
      setTasks(prevTasks=>prevTasks.map(task =>{
        if (task.end || !task.visible)return task;
        const now = new Date().getTime();
        const start = task.startDate.convert("gregorian").toDate().getTime();
        const end = task.endDate.convert("gregorian").toDate().getTime();
        const remaining = Math.max(0, end - now);
        const total = end - start;
        const elapsed = Math.max(0, now - start);
        const percentage = Math.min(100, (elapsed / total) * 100);
        const totalSeconds = Math.max(0, Math.floor(remaining / 1000));
        const days = Math.floor(totalSeconds / (3600 * 24));
        const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return { ...task, end:percentage >= 100, percentage, remaining:`${days} روز ${hours} ساعت ${minutes} دقیقه ${seconds} ثانیه` };
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const jDate = jalaali.toJalaali(
      time.getFullYear(),
      time.getMonth() + 1,
      time.getDate()
  );
  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");
  return (
    <>
    <SideBar tasks={tasks} setTasks={setTasks} theme={theme} getData={getData}/>
    <main>
        <Header hours={hours} minutes={minutes} seconds={seconds} jDate={jDate} theme={theme} setTheme={setTheme}/>
        <div className="container">
        {tasks.length === 0 ? <h1>هیچ برنامه‌ای وجود ندارد ✨</h1> : (
          tasks.map((task, index) => (
            <Content key={index} index={index} task={task} setTasks={setTasks} deleteData={deleteData}/>
          ))
        )}
        </div>
    </main>
    </>
  )
}

export default App
