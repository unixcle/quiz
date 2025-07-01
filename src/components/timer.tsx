import { useEffect } from "react";

function Timer({secRemain,dispatch}:any){
    const min = Math.floor(secRemain / 60)
    const sec = secRemain % 60
    useEffect(()=>{
       const id = setInterval(() => {
            dispatch({type:"tick"})
        }, 1000);
        console.log(id)
        return ()=> clearInterval(id)
    },[dispatch])
    return(
        <>
            <p className="timer">{min < 10 ? "0": ""}{min}:{sec < 10 ? "0" : ""}{sec}</p>
        </>
    )
}


export default Timer;