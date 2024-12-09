import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Scoreboard } from './pages/Scoreboard';
import { Matches } from './pages/Matches';
import { Settings } from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="pt-6">
          <Routes>
            <Route path="/" element={<Scoreboard />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;