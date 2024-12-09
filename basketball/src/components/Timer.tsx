import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimerProps {
  initialTime: number;
  onTimeEnd: () => void;
}

export function Timer({ initialTime, onTimeEnd }: TimerProps) {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number;
    
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            onTimeEnd();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, time, onTimeEnd]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(initialTime);
  };

  return (
    <div className="flex flex-col items-center space-y-4 bg-gray-800 p-6 rounded-lg">
      <div className="text-5xl font-mono font-bold text-white">
        {formatTime(time)}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={toggleTimer}
          className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white transition"
        >
          {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </button>
        <button
          onClick={resetTimer}
          className="p-2 bg-red-600 hover:bg-red-700 rounded-full text-white transition"
        >
          <RotateCcw className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}