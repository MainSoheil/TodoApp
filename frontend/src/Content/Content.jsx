import { useEffect, useRef } from "react";

export default function Content({ index, task, setTasks, deleteData }) {
  console.log("Task :", task);
  const { id, title, startDate, endDate, percentage, remaining } = task;
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setTasks(prev =>
        prev.map((t, i) =>
          i === index ? { ...t, visible: entry.isIntersecting } : t
        )
      );
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index, setTasks]);
  return (
    <div ref={ref} className="content">
      <div>
        <h3>
          {index+1}. {title}
        </h3>
        <p>
          <span className="mx5">✅</span>
          <span onClick={()=>{deleteData(id)}}>🗑️</span>
        </p>
      </div>

      <div>
        <p>
          زمان شروع :{" "}
          {startDate ? startDate.format("YYYY/MM/DD - HH:mm:ss") : "نامشخص"}
        </p>
      </div>

      <div>
        <label>
          <strong>
            زمان پایان :{" "}
            {endDate ? endDate.format("YYYY/MM/DD - HH:mm:ss") : "نامشخص"}
          </strong>
          <progress
            max="100"
            value={percentage}
            title={`${percentage.toFixed(1)}%`}
          >
            {percentage.toFixed(1)}%
          </progress>
        </label>
      </div>

      <div>
        <p>زمان باقی مانده : {remaining}</p>
        {task.end ? (
          <strong>✅ به اتمام رسید</strong>
        ) : (
          <strong>درحال انجام... ⏳</strong>
        )}
      </div>
    </div>
  );
}
