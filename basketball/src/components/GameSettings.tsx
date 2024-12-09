import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

export function GameSettings() {
  const defaultSettings = {
    quarterDuration: 12,
    showClock: true,
  };

  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('gameSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('gameSettings', JSON.stringify(settings));
  }, [settings]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev: any) => ({
      ...prev,
      [name]: parseInt(value, 10) || 0,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSettings((prev: any) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSaveSettings = () => {
    localStorage.setItem('gameSettings', JSON.stringify(settings));
    alert('Settings saved!');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto mb-6">
      <h1 className="text-2xl font-bold mb-6">Game Settings</h1>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-3">Game Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quarter Duration (minutes)
              </label>
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

        <div>
          <h2 className="text-lg font-semibold mb-3">Display Preferences</h2>
          <div className="space-y-2">
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

        <div className="pt-4">
          <button
            onClick={handleSaveSettings}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            <Save className="h-5 w-5" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}