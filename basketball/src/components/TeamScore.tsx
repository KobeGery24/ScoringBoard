import React from 'react';
import { Plus, Minus } from 'lucide-react';
import type { Team, Player } from '../types';

// Props interface for TeamScore component
interface TeamScoreProps {
  team: Team; // Team data including name, score, players, and timeouts
  onStatChange: (playerId: number, stat: string, increment: number) => void; // Callback to update player stats
  onTimeoutChange: (amount: number) => void; // Callback to update timeouts
}

// Component to display and manage the score and stats for a team
export function TeamScore({ team, onStatChange, onTimeoutChange }: TeamScoreProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {/* Team name */}
      <h2 className="text-2xl font-bold text-center mb-4">{team.name}</h2>
      
      {/* Team score display */}
      <div className="flex flex-col items-center mb-6">
        <div className="text-6xl font-bold text-indigo-600 mb-4">{team.score}</div>
      </div>

      {/* Timeouts section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Timeouts: {team.timeouts}</h3>
        <div className="flex space-x-2">
          {/* Increment timeout button */}
          <button
            onClick={() => onTimeoutChange(1)}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            <Plus className="h-4 w-4" />
          </button>
          {/* Decrement timeout button */}
          <button
            onClick={() => onTimeoutChange(-1)}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            disabled={team.timeouts <= 0} // Disable if no timeouts left
          >
            <Minus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Players section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Players</h3>
        <div className="space-y-2">
          {team.players.map((player) => (
            <div key={player.id} className="p-4 border rounded-lg">
              {/* Player name and number */}
              <h3 className="font-semibold mb-2">
                #{player.number} {player.name}
              </h3>
              {/* Points controls */}
              <div className="flex items-center mb-1">
                <span>Points: {player.points}</span>
                <div className="ml-auto">
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded mr-1"
                    onClick={() => onStatChange(player.id, "points", 2)}
                  >
                    +2
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded mr-1"
                    onClick={() => onStatChange(player.id, "points", 3)}
                  >
                    +3
                  </button>
                  <button
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                    onClick={() => onStatChange(player.id, "points", 1)}
                  >
                    +1
                  </button>
                </div>
              </div>
              {/* Rebounds controls */}
              <div className="flex items-center mb-1">
                <span>Rebounds: {player.rebounds}</span>
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded ml-auto"
                  onClick={() => onStatChange(player.id, "rebounds", 1)}
                >
                  +1
                </button>
              </div>
              {/* Assists controls */}
              <div className="flex items-center mb-1">
                <span>Assists: {player.assists}</span>
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded ml-auto"
                  onClick={() => onStatChange(player.id, "assists", 1)}
                >
                  +1
                </button>
              </div>
              {/* Steals controls */}
              <div className="flex items-center mb-1">
                <span>Steals: {player.steals}</span>
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded ml-auto"
                  onClick={() => onStatChange(player.id, "steals", 1)}
                >
                  +1
                </button>
              </div>
              {/* Fouls controls */}
              <div className="flex items-center mb-1">
                <span>Fouls: {player.fouls}</span>
                <button
                  className="px-2 py-1 bg-green-500 text-white rounded ml-auto"
                  onClick={() => onStatChange(player.id, "fouls", 1)}
                >
                  +1
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}