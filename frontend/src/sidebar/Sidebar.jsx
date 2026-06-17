import { useState } from 'react';
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import "react-multi-date-picker/styles/colors/green.css";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"

export default function SideBar({ tasks, setTasks, theme, getData }){
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(new DateObject({ calendar: persian, locale: persian_fa, date: new Date() }));
    const [error, setError] = useState("");
    const [settingVisiblity, setSettingVisiblity] = useState(false);
    const allTaskCount = tasks.length;
    const finishedTaskCount = tasks.filter((item, i)=>item.end).length;
    const unfinishedTaskCount = allTaskCount - finishedTaskCount;
    const addTask = (newTask) => setTasks(prev=>[...prev, newTask]);
    const handelAdd = ()=>{
        if (!title.trim()) return setError("لطفا عنوان برنامه را وارد کنید.");
        const start = new DateObject({ calendar: persian, locale: persian_fa, date: new Date() });
        const end = date;
        const nowTime = start.convert("gregorian").toDate().getTime();
        const endTime = end.convert("gregorian").toDate().getTime();
        if (endTime <= nowTime) return setError("زمان پایان باید بیشتر از زمان فعلی باشد ⏳");
        const task = {
            title: title,
            startDate: start,
            endDate: end,
            end:false,
            percentage:0,
            remaining:endTime-nowTime,
            visible: false
        };
        setTitle("");
        setError("");
        addTask(task);
        getData({
            title: title,
            startDate: start.format("YYYY/MM/DD HH:mm:ss"),
            endDate: end.format("YYYY/MM/DD HH:mm:ss")
        });
    }
    return (
        <aside className={settingVisiblity ? "show" : ""}>
            <div className='part'>
                <h1>TimeZone Todo</h1>
                <h3 className="secColor">زمان سنج پیشرفته</h3>
                <p className='my3 settingText' onClick={()=>{setSettingVisiblity(prev=>!prev)}}>تنظیمات⚙</p>
            </div>
            <div className='part clacContainer'>
                <h2>برنامه جدید</h2>
                <label>
                    <p className="my2 secColor">عنوان برنامه</p>
                    <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="یادگیری برنامه نویسی"/>
                </label>
                <div className='calcContainer'>
                    <p className="my2 secColor">تاریخ پایان</p>
                    <div className='calend'>
                        <Calendar
                        calendar={persian}
                        locale={persian_fa}
                        className={theme === "light" ? "green" : "bg-dark green"}
                        value={date}
                        onChange={setDate}
                        format="YYYY/MM/DD HH:mm:ss"
                        plugins={[ <TimePicker position="bottom" /> ]}
                        minDate={new DateObject({ calendar: persian, locale: persian_fa, date: new Date() })}
                        />
                        <p className='dateTime'>{date ? date.format("HH:mm:ss | YYYY/MM/DD") : ""}</p>
                        {error ? <p>{error}</p> : ''}
                    </div>
                </div>
                <button onClick={handelAdd}>اضافه کردن برنامه ✨</button>
            </div>
            <div className='part'>
                <h2>آمار کلی</h2>
                <p className='secColor'>برنامه ها : {allTaskCount}</p>
                <p className='secColor'>برنامه های به اتمام رسیده : {finishedTaskCount}</p>
                <p className='secColor'>برنامه های درحال انجام : {unfinishedTaskCount}</p>
                <p className='secColor'>کل برنامه ها : 0</p>
            </div>
        </aside>
    )
}
