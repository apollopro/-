import { Player } from "./types";

export const PLAYER_COLORS = [
  '#FFCDD2', // Red (North/East?)
  '#BBDEFB', // Blue
  '#C8E6C9', // Green
  '#FFF9C4', // Yellow
];

export const INITIAL_PLAYERS: Player[] = [
  { id: 'p1', name: 'North (北)', totalScore: 0, color: '#EF5350' }, // Red
  { id: 'p2', name: 'West (西)', totalScore: 0, color: '#42A5F5' },  // Blue
  { id: 'p3', name: 'South (南)', totalScore: 0, color: '#66BB6A' }, // Green
  { id: 'p4', name: 'East (东)', totalScore: 0, color: '#FFCA28' },  // Yellow
];

export const COURSE_COLORS = [
  '#FFCDD2', '#BBDEFB', '#C8E6C9', '#FFF9C4',
  '#E1BEE7', '#F8BBD0', '#D7CCC8', '#F0F4C3',
  '#B2DFDB', '#B3E5FC', '#DCEDC8', '#FFE0B2'
];