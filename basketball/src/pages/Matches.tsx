import React, { useState, useEffect } from "react";
import { Calendar, Trash2 } from "lucide-react";

type Match = {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
};

export function Matches() {
  const [savedMatches, setSavedMatches] = useState<Match[]>([]);

  useEffect(() => {
    const matches = JSON.parse(localStorage.getItem("savedMatches") || "[]");
    setSavedMatches(matches);
  }, []);

  const handleDelete = (index: number) => {
    const updatedMatches = savedMatches.filter((_, i) => i !== index);
    setSavedMatches(updatedMatches);
    localStorage.setItem("savedMatches", JSON.stringify(updatedMatches));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Match History</h1>
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            onClick={() => {
              if (savedMatches.length > 0) {
                const csvContent = [
                  ["Home Team", "Away Team", "Home Score", "Away Score", "Date"],
                  ...savedMatches.map((match) => [
                    match.homeTeam,
                    match.awayTeam,
                    match.homeScore,
                    match.awayScore,
                    new Date(match.date).toLocaleString(),
                  ]),
                ]
                  .map((e) => e.join(","))
                  .join("\n");

                const blob = new Blob([csvContent], { type: "text/csv" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "matches.csv";
                link.click();
              }
            }}
          >
            Export Games
          </button>
        </div>

        <div className="space-y-4">
          {savedMatches.length > 0 ? (
            savedMatches.map((match, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
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