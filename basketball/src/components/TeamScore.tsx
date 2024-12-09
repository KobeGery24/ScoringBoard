import React from 'react';
import { Plus, Minus } from 'lucide-react';
import type { Team, Player } from '../types';

interface TeamScoreProps {
  team: Team;
  onScoreChange: (amount: number) => void;
  onFoulChange: (playerId: number) => void;
  onTimeoutChange: (amount: number) => void;
}

export function TeamScore({ team, onScoreChange, onFoulChange, onTimeoutChange }: TeamScoreProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">{team.name}</h2>
      
      <div className="flex flex-col items-center mb-6">
        <div className="text-6xl font-bold text-indigo-600 mb-4">{team.score}</div>
        <div className="flex space-x-2">
          <button
            onClick={() => onScoreChange(2)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            +2
          </button>
          <button
            onClick={() => onScoreChange(3)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            +3
          </button>
          <button
            onClick={() => onScoreChange(1)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            +1
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Timeouts: {team.timeouts}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onTimeoutChange(1)}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            onClick={() => onTimeoutChange(-1)}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            disabled={team.timeouts <= 0}
          >
            <Minus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Players</h3>
        <div className="space-y-2">
          {team.players.map((player) => (
            <div key={player.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div>
                <span className="font-medium">#{player.number}</span>
                <span className="ml-2">{player.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">Fouls: {player.fouls}</span>
                <button
                  onClick={() => onFoulChange(player.id)}
                  className="p-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                  disabled={player.fouls >= 5}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}