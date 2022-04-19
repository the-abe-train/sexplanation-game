import { Dayjs } from "dayjs";

export type Layer =
  | "Vulva"
  | "Clitoris"
  | "Uterus"
  | "Penis"
  | "Internal"
  | "Foreskin";

export type Part = {
  name: string;
  clues: string[];
  diagrams: Layer[];
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
