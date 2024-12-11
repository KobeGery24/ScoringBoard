import React, { useState, useEffect } from "react";
import { Calendar, Trash2 } from "lucide-react"; // Import icons for display

// Define the Player type for structured player data
type Player = {
  id: number;
  name: string;
  number: string;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  fouls: number;
};

// Define the Match type to represent match details
type Match = {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  homePlayers: Player[];
  awayPlayers: Player[];
};

// Main Matches component
export function Matches() {
  const [savedMatches, setSavedMatches] = useState<Match[]>([]); // State to store saved matches

  // Load saved matches from localStorage on component mount
  useEffect(() => {
    const matches = JSON.parse(localStorage.getItem("savedMatches") || "[]");
    setSavedMatches(matches);
  }, []);

  // Delete a match by its index
  const handleDelete = (index: number) => {
    const updatedMatches = savedMatches.filter((_, i) => i !== index);
    setSavedMatches(updatedMatches);
    localStorage.setItem("savedMatches", JSON.stringify(updatedMatches)); // Update localStorage
  };

  // Export matches and players to a CSV file
  const handleExport = () => {
    if (savedMatches.length > 0) {
      const csvRows = [];

      // Add CSV headers
      csvRows.push(
        [
          "Home Team",
          "Away Team",
          "Home Score",
          "Away Score",
          "Date",
          "Time",
          "Player Team",
          "Player Name",
          "Player Number",
          "Points",
          "Rebounds",
          "Assists",
          "Steals",
          "Fouls",
        ].join(",")
      );

      // Add match and player data
      savedMatches.forEach((match) => {
        const matchDate = new Date(match.date).toLocaleString();

        // Add home players
        match.homePlayers.forEach((player) => {
          csvRows.push(
            [
              match.homeTeam,
              match.awayTeam,
              match.homeScore,
              match.awayScore,
              matchDate,
              match.homeTeam,
              player.name,
              player.number,
              player.points,
              player.rebounds,
              player.assists,
              player.steals,
              player.fouls,
            ].join(",")
          );
        });

        // Add away players
        match.awayPlayers.forEach((player) => {
          csvRows.push(
            [
              match.homeTeam,
              match.awayTeam,
              match.homeScore,
              match.awayScore,
              matchDate,
              match.awayTeam,
              player.name,
              player.number,
              player.points,
              player.rebounds,
              player.assists,
              player.steals,
              player.fouls,
            ].join(",")
          );
        });
      });

      // Create a downloadable CSV file
      const csvContent = csvRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "matches_with_players.csv";
      link.click();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Header with Export button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Match History</h1>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            onClick={handleExport}
          >
            Export Games
          </button>
        </div>

        {/* Match list */}
        <div className="space-y-4">
          {savedMatches.length > 0 ? (
            savedMatches.map((match, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                {/* Match details */}
                <div className="flex items-center space-x-4">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="font-semibold">
                      {match.homeTeam} vs {match.awayTeam}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(match.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Score and delete button */}
                <div className="flex items-center space-x-4">
                  <div className="text-lg font-semibold">
                    {match.homeScore} - {match.awayScore}
                  </div>
                  <button
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    onClick={() => handleDelete(index)}
                    aria-label="Delete Match"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No matches saved yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}