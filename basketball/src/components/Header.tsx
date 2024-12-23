import React from 'react';
import { CircleDot, Settings, List } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { FaBasketballBall } from "react-icons/fa";

export function Header() {
  // Get the current location to highlight the active link
  const location = useLocation();
  
  return (
    <header className="bg-indigo-600 text-white px-6 py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and title linking to the home page */}
        <Link to="/" className="flex items-center space-x-2">
          <FaBasketballBall color='orange' size={24} />
          <span className="text-xl font-bold">Skibidi ScoringBoard Sigma+</span>
        </Link>
        
        {/* Navigation links */}
        <nav className="flex space-x-6">
          {/* Link to Matches page */}
          <Link
            to="/matches"
            className={`flex items-center space-x-1 hover:text-indigo-200 transition ${
              location.pathname === '/matches' ? 'text-indigo-200' : ''
            }`}
          >
            <List className="h-5 w-5" /> {/* Matches icon */}
            <span>Matches</span>
          </Link>
          
          {/* Link to Scoreboard page */}
          <Link
            to="/"
            className={`flex items-center space-x-1 hover:text-indigo-200 transition ${
              location.pathname === '/' ? 'text-indigo-200' : ''
            }`}
          >
            <span>Scoreboard</span>
          </Link>
          
          {/* Link to Settings page */}
          <Link
            to="/settings"
            className={`flex items-center space-x-1 hover:text-indigo-200 transition ${
              location.pathname === '/settings' ? 'text-indigo-200' : ''
            }`}
          >
            <Settings className="h-5 w-5" /> {/* Settings icon */}
            <span>Settings</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}