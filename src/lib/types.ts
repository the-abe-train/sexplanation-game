import { Dayjs } from "dayjs";

export type PictureIndex = { [key: string]: string };

export type Sex = "Male" | "Female";

export type Answer = {
  clue: string;
  part: string;
};

export type Layer =
  | "Outside"
  | "Inside"
  | "The Tip"
  | "Mobile The Tip"
  | "Deeper";

export type DiagramInfo = {
  sex: Sex;
  layer: Layer;
};

// The hardest TS I have ever written lol
export type DiagramIndex<T> = {
  [key in Sex]: {
    [key in Layer]?: T;
  };
};

export type Part = {
  name: string;
  clues: string[];
  diagrams: DiagramInfo[];
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
