import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

export function GameSettings() {
  // Default settings for the game
  const defaultSettings = {
    quarterDuration: 12,
    showClock: true,
  };

  // State to store settings, initialized from localStorage or defaults
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('gameSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  // Effect to save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('gameSettings', JSON.stringify(settings));
  }, [settings]);

  // Handle changes for input fields (e.g., quarter duration)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev: any) => ({
      ...prev,
      [name]: parseInt(value, 10) || 0, // Parse value to integer
    }));
  };

  // Handle changes for checkbox fields (e.g., show clock)
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSettings((prev: any) => ({
      ...prev,
      [name]: checked, // Update checkbox value
    }));
  };

  // Save settings to localStorage and notify the user
  const handleSaveSettings = () => {
    localStorage.setItem('gameSettings', JSON.stringify(settings));
    alert('Settings saved!');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto mb-6">
      <h1 className="text-2xl font-bold mb-6">Game Settings</h1>

      <div className="space-y-6">
        {/* Section for game configuration */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Game Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quarter Duration (minutes)
              </label>
              {/* Input for quarter duration */}
              <input
                type="number"
                name="quarterDuration"
                className="w-full px-3 py-2 border rounded-md"
                value={settings.quarterDuration}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Section for display preferences */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Display Preferences</h2>
          <div className="space-y-2">
            {/* Checkbox for showing the clock */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="showClock"
                checked={settings.showClock}
                onChange={handleCheckboxChange}
              />
              <span>Show clock</span>
            </label>
          </div>
        </div>

        {/* Button to save settings */}
        <div className="pt-4">
          <button
            onClick={handleSaveSettings}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            <Save className="h-5 w-5" /> {/* Save icon */}
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}