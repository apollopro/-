export interface Player {
  id: string;
  name: string;
  totalScore: number;
  color: string;
}

export interface Round {
  id: string;
  timestamp: number;
  scores: Record<string, number>; // Map playerId to score
}

export interface GameState {
  players: Player[];
  rounds: Round[];
}

export const DEFAULT_PLAYER_IDS = ['p1', 'p2', 'p3', 'p4'];

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
export type DayOfWeek = typeof DAYS[number];

export interface Course {
  id: string;
  name: string;
  location: string;
  teacher: string;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  color: string;
}