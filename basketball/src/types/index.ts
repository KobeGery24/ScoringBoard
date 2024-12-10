export interface Player {
    id: number;
    name: string;
    number: string;
    fouls: number;
    points: number;
    rebounds: number;
    assists: number;
    steals: number;
  }
  
  export interface Team {
    name: string;
    score: number;
    timeouts: number;
    players: Player[];
  }
  
  export interface Match {
    id: string;
    date: string;
    homeTeam: Team;
    awayTeam: Team;
    duration: number;
    status: 'ongoing' | 'completed';
  }