import { Dayjs } from "dayjs";

export type Part = {
  name: string;
  alternate_names: string[];
  clue: string;
};

export type StoredGuesses = {
  day: Dayjs;
  guesses: string[];
};

export type StatTable = {
  gamesWon: number;
  lastWin: Dayjs;
  currentStreak: number;
  maxStreak: number;
  usedGuesses: number[];
  games: {
    guesses: number;
    win: boolean;
    date: Dayjs;
  }[];
};
