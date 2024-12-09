import React from "react";
import type { Team } from "../types";

interface MatchControlsProps {
  onRestart: () => void;
  onSave: () => void;
}

export function MatchControls({ onRestart, onSave }: MatchControlsProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <button
        onClick={onRestart}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Restart Match
      </button>
      <button
        onClick={onSave}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Save Match
      </button>
    </div>
  );
}