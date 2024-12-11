import React from "react";
import type { Team } from "../types";

// Props interface for MatchControls component
interface MatchControlsProps {
  onRestart: () => void; // Callback function to restart the match
  onSave: () => void; // Callback function to save the match
}

// MatchControls component for match management actions
export function MatchControls({ onRestart, onSave }: MatchControlsProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      {/* Button to restart the match */}
      <button
        onClick={onRestart}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Restart Match
      </button>
      {/* Button to save the match */}
      <button
        onClick={onSave}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Save Match
      </button>
    </div>
  );
}