import { useRef, useState, useEffect } from "react";
import './App.css'

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const start = () => {
    if (isRunning) return;
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  };

  const reset = () => {
    stop();
    setTime(0);
    setLaps([]);
  };

  const addLap = () => {
    if (!isRunning) return;
    setLaps((prev) => [...prev, time]);
  };

  const clearLaps = () => {
    setLaps([]);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

const formatTime = (sec) => {
  const h = String(Math.floor(sec / 3600)).padStart(2, "0");
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");

  return `${h}:${m}:${s}`;
};

  return (
    <div className="stopwatch-container">
      <h1 className="stopwatch-time">{formatTime(time)}</h1>

      <div className="button-group">
        {!isRunning ? (
          <button className="btn btn-start" onClick={start}>Start</button>
        ) : (
          <button className="btn btn-stop" onClick={stop}>Stop</button>
        )}

        <button className="btn btn-reset" onClick={reset}>Reset</button>

        <button className="btn btn-lap" onClick={addLap} disabled={!isRunning}>
          Lap
        </button>
      </div>

      {laps.length > 0 && (
        <>
          <h2 className="laps-heading">Laps</h2>
          <ul className="lap-list">
            {laps.map((lap, i) => (
              <li key={i} className="lap-item">
                <span>Lap {i + 1}</span>
                <span>{formatTime(lap)}</span>
              </li>
            ))}
          </ul>

          <button className="btn btn-clear" onClick={clearLaps}>
            Clear Laps
          </button>
        </>
      )}
    </div>
  );
}
