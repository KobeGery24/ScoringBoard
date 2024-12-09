import React, { useState, useEffect } from "react";
import { Timer } from "../components/Timer";
import { TeamScore } from "../components/TeamScore";
import { MatchControls } from "../components/MatchControls";
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

export function Scoreboard() {
  const [homeTeam, setHomeTeam] = useState<Team>(
    JSON.parse(localStorage.getItem("homeTeam")!) || defaultHomeTeam
  );
  const [awayTeam, setAwayTeam] = useState<Team>(
    JSON.parse(localStorage.getItem("awayTeam")!) || defaultAwayTeam
  );
  const [gameSettings, setGameSettings] = useState(() => {
    const savedSettings = localStorage.getItem("gameSettings");
    return savedSettings
      ? JSON.parse(savedSettings)
      : { quarterDuration: 12, showClock: true };
  });

  // Save teams to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem("homeTeam", JSON.stringify(homeTeam));
    localStorage.setItem("awayTeam", JSON.stringify(awayTeam));
  }, [homeTeam, awayTeam]);

  const handleRestart = () => {
    setHomeTeam((prev) => ({ ...defaultHomeTeam, name: prev.name }));
    setAwayTeam((prev) => ({ ...defaultAwayTeam, name: prev.name }));
  };

  const handleSave = () => {
    const savedMatches = JSON.parse(localStorage.getItem("savedMatches") || "[]");
    const newMatch = {
      homeTeam: homeTeam.name,
      awayTeam: awayTeam.name,
      homeScore: homeTeam.score,
      awayScore: awayTeam.score,
      date: new Date().toISOString(),
    };
    localStorage.setItem("savedMatches", JSON.stringify([...savedMatches, newMatch]));
    console.log("Match saved!");
  };

  const handleHomeScoreChange = (amount: number) => {
    setHomeTeam((prev) => ({ ...prev, score: prev.score + amount }));
  };

  const handleAwayScoreChange = (amount: number) => {
    setAwayTeam((prev) => ({ ...prev, score: prev.score + amount }));
  };

  const handleHomeFoulChange = (playerId: number) => {
    setHomeTeam((prev) => ({
      ...prev,
      players: prev.players.map((player) =>
        player.id === playerId
          ? { ...player, fouls: Math.min(player.fouls + 1, 5) }
          : player
      ),
    }));
  };

  const handleAwayFoulChange = (playerId: number) => {
    setAwayTeam((prev) => ({
      ...prev,
      players: prev.players.map((player) =>
        player.id === playerId
          ? { ...player, fouls: Math.min(player.fouls + 1, 5) }
          : player
      ),
    }));
  };

  const handleHomeTimeoutChange = (amount: number) => {
    setHomeTeam((prev) => ({
      ...prev,
      timeouts: Math.max(0, Math.min(prev.timeouts + amount, 4)),
    }));
  };

  const handleAwayTimeoutChange = (amount: number) => {
    setAwayTeam((prev) => ({
      ...prev,
      timeouts: Math.max(0, Math.min(prev.timeouts + amount, 4)),
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {gameSettings.showClock && (
        <div className="mb-8">
          <Timer
            initialTime={gameSettings.quarterDuration * 60}
            onTimeEnd={() => console.log("Quarter ended")}
          />
        </div>
      )}

      <MatchControls onRestart={handleRestart} onSave={handleSave} />

      <div className="grid md:grid-cols-2 gap-8">
        <TeamScore
          team={homeTeam}
          onScoreChange={handleHomeScoreChange}
          onFoulChange={handleHomeFoulChange}
          onTimeoutChange={handleHomeTimeoutChange}
        />
        <TeamScore
          team={awayTeam}
          onScoreChange={handleAwayScoreChange}
          onFoulChange={handleAwayFoulChange}
          onTimeoutChange={handleAwayTimeoutChange}
        />
      </div>
    </div>
  );
}