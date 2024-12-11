import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react'; // Import icons for play, pause, and reset

interface TimerProps {
  initialTime: number; // Initial time in seconds
  onTimeEnd: () => void; // Callback for when the timer reaches zero
}

export function Timer({ initialTime, onTimeEnd }: TimerProps) {
  const [time, setTime] = useState(initialTime); // Current remaining time
  const [isRunning, setIsRunning] = useState(false); // Timer running state

  // Effect to handle timer countdown
  useEffect(() => {
    let interval: number;
    
    if (isRunning && time > 0) {
      // Start a 1-second interval to decrement the timer
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false); // Stop the timer
            onTimeEnd(); // Trigger callback
            return 0; // Set time to 0
          }
          return prevTime - 1; // Decrement time
        });
      }, 1000);
    }

    // Cleanup the interval on unmount or state change
    return () => clearInterval(interval);
  }, [isRunning, time, onTimeEnd]);

  // Format seconds into MM:SS format
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle between running and paused states
  const toggleTimer = () => setIsRunning(!isRunning);

  // Reset timer to initial state
  const resetTimer = () => {
    setIsRunning(false);
    setTime(initialTime);
  };

  return (
    <div className="flex flex-col items-center space-y-4 bg-gray-800 p-6 rounded-lg">
      {/* Display formatted time */}
      <div className="text-5xl font-mono font-bold text-white">
        {formatTime(time)}
      </div>

      {/* Controls for play/pause and reset */}
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