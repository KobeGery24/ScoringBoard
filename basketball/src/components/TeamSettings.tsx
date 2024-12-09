import React, { useState, useEffect } from "react";
import { Save } from "lucide-react";
import type { Team } from "../types";

const defaultHomeTeam: Team = {
  name: "Home Team",
  score: 0,
  timeouts: 3,
  players: [
    { id: 1, name: "Player 1", number: "1", fouls: 0 },
    { id: 2, name: "Player 2", number: "2", fouls: 0 },
    { id: 3, name: "Player 3", number: "3", fouls: 0 },
    { id: 4, name: "Player 4", number: "4", fouls: 0 },
    { id: 5, name: "Player 5", number: "5", fouls: 0 },
  ],
};

const defaultAwayTeam: Team = {
  name: "Away Team",
  score: 0,
  timeouts: 3,
  players: [
    { id: 1, name: "Player 1", number: "1", fouls: 0 },
    { id: 2, name: "Player 2", number: "2", fouls: 0 },
    { id: 3, name: "Player 3", number: "3", fouls: 0 },
    { id: 4, name: "Player 4", number: "4", fouls: 0 },
    { id: 5, name: "Player 5", number: "5", fouls: 0 },
  ],
};

export function TeamSettings() {
  const [homeTeam, setHomeTeam] = useState<Team>(
    JSON.parse(localStorage.getItem("homeTeam")!) || defaultHomeTeam
  );
  const [awayTeam, setAwayTeam] = useState<Team>(
    JSON.parse(localStorage.getItem("awayTeam")!) || defaultAwayTeam
  );

  useEffect(() => {
    localStorage.setItem("homeTeam", JSON.stringify(homeTeam));
    localStorage.setItem("awayTeam", JSON.stringify(awayTeam));
  }, [homeTeam, awayTeam]);

  const handleTeamChange = (
    teamKey: "homeTeam" | "awayTeam",
    field: string,
    value: any
  ) => {
    const setTeam = teamKey === "homeTeam" ? setHomeTeam : setAwayTeam;
    const currentTeam = teamKey === "homeTeam" ? homeTeam : awayTeam;

    setTeam({
      ...currentTeam,
      [field]: value,
    });
  };

  const handlePlayerChange = (
    teamKey: "homeTeam" | "awayTeam",
    playerId: number,
    field: string,
    value: any
  ) => {
    const setTeam = teamKey === "homeTeam" ? setHomeTeam : setAwayTeam;
    const currentTeam = teamKey === "homeTeam" ? homeTeam : awayTeam;

    setTeam({
      ...currentTeam,
      players: currentTeam.players.map((player) =>
        player.id === playerId ? { ...player, [field]: value } : player
      ),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Team Settings</h1>

      {["homeTeam", "awayTeam"].map((teamKey) => {
        const team = teamKey === "homeTeam" ? homeTeam : awayTeam;
        return (
          <div key={teamKey} className="mb-6">
            <h2 className="text-lg font-semibold mb-3">
              {teamKey === "homeTeam" ? "Home Team" : "Away Team"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Team Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={team.name}
                  onChange={(e) =>
                    handleTeamChange(teamKey as any, "name", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Score
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md"
                  value={team.score}
                  onChange={(e) =>
                    handleTeamChange(teamKey as any, "score", +e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timeouts
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md"
                  value={team.timeouts}
                  onChange={(e) =>
                    handleTeamChange(teamKey as any, "timeouts", +e.target.value)
                  }
                />
              </div>

              <div>
                <h3 className="text-md font-semibold mb-2">Players</h3>
                {team.players.map((player) => (
                  <div
                    key={player.id}
                    className="grid grid-cols-3 gap-2 items-center mb-2"
                  >
                    <input
                      type="text"
                      className="col-span-1 px-3 py-1 border rounded-md"
                      value={player.name}
                      onChange={(e) =>
                        handlePlayerChange(
                          teamKey as any,
                          player.id,
                          "name",
                          e.target.value
                        )
                      }
                    />
                    <input
                      type="text"
                      className="col-span-1 px-3 py-1 border rounded-md"
                      value={player.number}
                      onChange={(e) =>
                        handlePlayerChange(
                          teamKey as any,
                          player.id,
                          "number",
                          e.target.value
                        )
                      }
                    />
                    <input
                      type="number"
                      className="col-span-1 px-3 py-1 border rounded-md"
                      value={player.fouls}
                      onChange={(e) =>
                        handlePlayerChange(
                          teamKey as any,
                          player.id,
                          "fouls",
                          +e.target.value
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      <div className="pt-4">
        <button
          onClick={() =>
            alert("Settings have been saved to localStorage!")
          }
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          <Save className="h-5 w-5" />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );
}