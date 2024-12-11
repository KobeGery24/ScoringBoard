import React, { useState, useEffect } from "react";
import { Timer } from "../components/Timer";
import { TeamScore } from "../components/TeamScore";
import { MatchControls } from "../components/MatchControls";
import type { Team, Player } from "../types";

// Default home team with initial values
const defaultHomeTeam: Team = {
  name: "Home Team",
  score: 0,
  timeouts: 3,
  players: [
    { id: 1, name: "Player 1", number: "1", fouls: 0, points: 0, rebounds: 0, assists: 0, steals: 0 },
    { id: 2, name: "Player 2", number: "2", fouls: 0 , points: 0, rebounds: 0, assists: 0, steals: 0 },
    { id: 3, name: "Player 3", number: "3", fouls: 0 , points: 0, rebounds: 0, assists: 0, steals: 0 },
    { id: 4, name: "Player 4", number: "4", fouls: 0 , points: 0, rebounds: 0, assists: 0, steals: 0 },
    { id: 5, name: "Player 5", number: "5", fouls: 0 , points: 0, rebounds: 0, assists: 0, steals: 0 },
  ],
};

// Default away team with initial values
const defaultAwayTeam: Team = {
  name: "Away Team",
  score: 0,
  timeouts: 3,
  players: [
    { id: 1, name: "Player 1", number: "1", fouls: 0 , points: 0, rebounds: 0, assists: 0, steals: 0 },
    { id: 2, name: "Player 2", number: "2", fouls: 0 , points: 0, rebounds: 0, assists: 0, steals: 0 },
    { id: 3, name: "Player 3", number: "3", fouls: 0 , points: 0, rebounds: 0, assists: 0, steals: 0 },
    { id: 4, name: "Player 4", number: "4", fouls: 0 , points: 0, rebounds: 0, assists: 0, steals: 0 },
    { id: 5, name: "Player 5", number: "5", fouls: 0 , points: 0, rebounds: 0, assists: 0, steals: 0 },
  ],
};

export function Scoreboard() {
  // State to store home and away teams, loaded from localStorage if available
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
      : { quarterDuration: 12, showClock: true }; // Default settings
  });

  // Save teams to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem("homeTeam", JSON.stringify(homeTeam));
    localStorage.setItem("awayTeam", JSON.stringify(awayTeam));
  }, [homeTeam, awayTeam]);

  // Handle restarting the game (reset to default values)
  const handleRestart = () => {
    setHomeTeam((prev) => ({ ...defaultHomeTeam, name: prev.name }));
    setAwayTeam((prev) => ({ ...defaultAwayTeam, name: prev.name }));
  };

  // Handle saving the match to localStorage
  const handleSave = () => {
    const savedMatches = JSON.parse(localStorage.getItem("savedMatches") || "[]");

    const newMatch = {
      homeTeam: homeTeam.name,
      awayTeam: awayTeam.name,
      homeScore: homeTeam.score,
      awayScore: awayTeam.score,
      date: new Date().toISOString(),
      homePlayers: homeTeam.players.map((player) => ({
        id: player.id,
        name: player.name,
        number: player.number,
        points: player.points || 0,
        rebounds: player.rebounds || 0,
        assists: player.assists || 0,
        steals: player.steals || 0,
        fouls: player.fouls || 0,
      })),
      awayPlayers: awayTeam.players.map((player) => ({
        id: player.id,
        name: player.name,
        number: player.number,
        points: player.points || 0,
        rebounds: player.rebounds || 0,
        assists: player.assists || 0,
        steals: player.steals || 0,
        fouls: player.fouls || 0,
      })),
    };

    localStorage.setItem("savedMatches", JSON.stringify([...savedMatches, newMatch]));
    alert("Match saved with player stats!"); // Notify user that match is saved
  };

  // Handle scoring for home or away team
  const handleScoreChange = (team: string, increment: number) => {
    let currentScore = increment;
    if (team === homeTeam.name) {
      homeTeam.players.forEach((player) => {
        currentScore += player.points;
      });
      setHomeTeam((prev) => ({
        ...prev,
        score: currentScore,
      }));
    } else if(team === awayTeam.name) {
      awayTeam.players.forEach((player) => {
        currentScore += player.points;
      });
      setAwayTeam((prev) => ({
        ...prev,
        score: currentScore,
      }));
    }
  };

  // Handle timeout changes for home team
  const handleHomeTimeoutChange = (amount: number) => {
    setHomeTeam((prev) => ({
      ...prev,
      timeouts: Math.max(0, Math.min(prev.timeouts + amount, 4)), // Timeout limit is 4
    }));
  };

  // Handle timeout changes for away team
  const handleAwayTimeoutChange = (amount: number) => {
    setAwayTeam((prev) => ({
      ...prev,
      timeouts: Math.max(0, Math.min(prev.timeouts + amount, 4)), // Timeout limit is 4
    }));
  };

  // Handle player stat changes (points, rebounds, assists, etc.)
  const handleStatChange = (
    teamSetter: React.Dispatch<React.SetStateAction<Team>>,
    playerId: number,
    stat: string,
    increment: number
  ) => {
    teamSetter((prevTeam) => ({
      ...prevTeam,
      players: prevTeam.players.map((player) => {
        if (player.id === playerId) {
          switch (stat) {
            case "points":
              handleScoreChange(prevTeam.name, increment);
              return { ...player, points: player.points + increment };
            case "rebounds":
              return { ...player, rebounds: player.rebounds + increment };
            case "assists":
              return { ...player, assists: player.assists + increment };
            case "steals":
              return { ...player, steals: player.steals + increment };
            case "fouls":
              return { ...player, fouls: Math.min(player.fouls + increment, 5) }; // Max 5 fouls
            default:
              return player; // If stat is unknown, no change
          }
        }
        return player; // No change if player.id doesn't match
      }),
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {gameSettings.showClock && (
        <div className="mb-8">
          <Timer
            initialTime={gameSettings.quarterDuration * 60}
            onTimeEnd={() => console.log("Quarter ended")} // Log when quarter ends
          />
        </div>
      )}

      <MatchControls onRestart={handleRestart} onSave={handleSave} />

      <div className="grid md:grid-cols-2 gap-8">
        <TeamScore
          team={homeTeam}
          onStatChange={(playerId, stat, increment) =>
            handleStatChange(setHomeTeam, playerId, stat, increment)
          }
          onTimeoutChange={handleHomeTimeoutChange}
        />
        <TeamScore
          team={awayTeam}
          onStatChange={(playerId, stat, increment) =>
            handleStatChange(setAwayTeam, playerId, stat, increment)
          }
          onTimeoutChange={handleAwayTimeoutChange}
        />
      </div>
    </div>
  );
}