export default function Header({hours, minutes, seconds, jDate, theme, setTheme}){
    const toggleThem = ()=>{
    setTheme((prev)=>(prev==="light" ? "dark" : "light"));
    }
    return (
        <header>
            <h3 onClick={toggleThem}>{theme==="light" ? "روشن 🌞" : "تاریک 🌙"}</h3>
            <h2>برنامه های شما</h2>
            <strong>زمان حال : {jDate.jy}/{String(jDate.jm).padStart(2, "0")}/{String(jDate.jd).padStart(2, "0")} - {hours}:{minutes}:{seconds}</strong>
        </header>
    );
}