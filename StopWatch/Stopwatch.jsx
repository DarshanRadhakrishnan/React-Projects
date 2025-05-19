
import React,{useState,useEffect,useRef} from "react";
function Stopwatch(){
    const [isRunning,setIsrunning]=useState(false);
    const [elapsedTime,setelapsedTime]=useState(0);
    const [laps,addLaps]=useState([]);
    const startTime=useRef(0);
    const intervalID=useRef(null);
    useEffect(()=>{
        if(isRunning){
            intervalID.current=setInterval(()=>{
                const newTime=Date.now()-startTime.current;
                setelapsedTime(newTime);
            },10)
        }
        return ()=>{
            clearInterval(intervalID.current);
        }
    },[isRunning]
);
    function start(){
        setIsrunning(true);
        startTime.current=Date.now()-elapsedTime;
    }
    function stop(){
        setIsrunning(false);
    }
    function reset(){
        setelapsedTime(0);
        setIsrunning(false);
    }
    function lap(){
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let milliseconds = Math.floor(elapsedTime % 1000);
        const pad = (num, size) => String(num).padStart(size, "0");
        const newLap= `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(milliseconds, 3)}`;
        addLaps(l=>[...l,newLap]);
    }
    function formatTime() {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        let seconds = Math.floor((elapsedTime / 1000) % 60);
        let milliseconds = Math.floor(elapsedTime % 1000);
        const pad = (num, size) => String(num).padStart(size, "0");
        return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}.${pad(milliseconds, 3)}`;
      }
    const LapsDisplay=laps.map((element,index)=>(
        <li key={index}>{element}</li>
    ));
    return(<div className="main-container">
        <div className="stopWatch">
        <p >{formatTime()}</p>
        <button onClick={start} className="start-button">Start</button>
        <button onClick={stop} className="stop-button">Stop</button>
        <button onClick={reset} className="reset-button">Reset</button>
        <button onClick={lap} className="lap-button">Lap</button>
        </div>
        <div className="Laps">
            <ul>{LapsDisplay}</ul>
        </div>
    </div>)
}
export default Stopwatch