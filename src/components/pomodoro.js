import React, { useState, useEffect } from "react";

const PomodoroTimer = () => {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [workSeconds, setWorkSeconds] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [cycles, setCycles] = useState(0);
  const audio = new Audio("./alarm/sound.wav");

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        if (isBreak) {
          if (breakSeconds > 0) {
            setBreakSeconds(breakSeconds - 1);
          } else if (breakMinutes > 0) {
            setBreakMinutes(breakMinutes - 1);
            setBreakSeconds(59);
          } else {
            audio.play();
            resetTimer();
            setCycles(cycles + 1);
            setIsBreak(false);
            setWorkMinutes(workMinutes);
            setWorkSeconds(workSeconds);
          }
        } else {
          if (workSeconds > 0) {
            setWorkSeconds(workSeconds - 1);
          } else if (workMinutes > 0) {
            setWorkMinutes(workMinutes - 1);
            setWorkSeconds(59);
          } else {
            audio.play();
            resetTimer();
            setIsBreak(true);
            setBreakMinutes(breakMinutes);
            setBreakSeconds(breakSeconds);
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, workMinutes, workSeconds, breakMinutes, breakSeconds, cycles, isBreak]);

  const resetTimer = () => {
    setIsRunning(false);
    setIsBreak(false);
    setWorkMinutes(25);
    setWorkSeconds(0);
    setBreakMinutes(5);
    setBreakSeconds(0);
  };

  const toggleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleWorkMinuteChange = (e) => {
    setWorkMinutes(parseInt(e.target.value));
  };

  const handleBreakMinuteChange = (e) => {
    setBreakMinutes(parseInt(e.target.value));
  };

  return (
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <div className="flex flex-col items-center p-8 bg-black rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-white mb-4">
          {isBreak ? "Break Timer" : "Work Timer"}
        </h2>
        
        <div className="text-6xl font-mono font-bold text-white my-8">
          {String(isBreak ? breakMinutes : workMinutes).padStart(2, "0")}:
          {String(isBreak ? breakSeconds : workSeconds).padStart(2, "0")}
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          <input
            type="number"
            value={workMinutes}
            onChange={handleWorkMinuteChange}
            className="w-24 px-4 py-2 mb-4 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isRunning}
          />
          <input
            type="number"
            value={breakMinutes}
            onChange={handleBreakMinuteChange}
            className="w-24 px-4 py-2 mb-4 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isRunning}
          />

          <button
            onClick={toggleStartPause}
            className={`px-6 py-2 rounded-md text-white font-medium transition-colors ${
              isRunning
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isRunning ? "Pause" : "Start"}
          </button>

          <button
            onClick={resetTimer}
            className="px-6 py-2 rounded-md bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="mt-4 text-sm text-white">
          Cycles completed: {cycles}
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;