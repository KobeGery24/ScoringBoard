import React from 'react';
import { Save } from 'lucide-react';
import { GameSettings } from '../components/GameSettings';
import { TeamSettings } from '../components/TeamSettings';

export function Settings() {
  return (
    <div className="container mx-auto px-4 py-8">
      <GameSettings />
      <TeamSettings />
    </div>
  );
}