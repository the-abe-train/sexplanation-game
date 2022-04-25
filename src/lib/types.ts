import { Dayjs } from "dayjs";

export type PictureIndex = { [key: string]: string };

export type Sex = "Male" | "Female";

export type Answer = {
  clue: string;
  part: string;
};

export type Layer =
  | "Vulva"
  | "Clitoris"
  | "Uterus"
  | "Penis"
  | "Internal"
  | "Foreskin";

export type DiagramInfo = {
  sex: Sex;
  layer: Layer;
};

export type Part = {
  name: string;
  clues: string[];
  diagrams: Layer[];
};

export type StoredGuesses = {
  expiration: Dayjs;
  guesses: string[];
};

export type StatTable = {
  gamesWon: number;
  lastGame: Dayjs;
  currentStreak: number;
  maxStreak: number;
  usedGuesses: number[];
  games: {
    guesses: number;
    win: boolean;
    date: Dayjs;
  }[];
};
