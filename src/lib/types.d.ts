export type Part = {
  name: string;
  alternate_names: string[];
  clue: string;
};

export type StoredGuesses = {
  day: string;
  guesses: Part[];
};
