import { LAUNCH_DAY, MIDNIGHT, SHUFFLE_KEY } from "./contstants";
import { parts } from "../data/parts";

function dailyKey(shuffleKey: string, list: any[]) {
  const dayCode = MIDNIGHT.unix();
  const key = Math.floor(dayCode / parseInt(shuffleKey)) % list.length;
  return key;
}

function randomKey(list: any[]) {
  return Math.floor(Math.random() * list.length);
}

const clues = parts.flatMap((part) => part.clues);

const clueMap = clues.map((clue) => {
  const part = parts.find((part) => part.clues.includes(clue));
  return {
    clue: clue,
    part: part?.name || "",
  };
});

export function generateAnswer(random?: boolean) {
  const key = random ? randomKey(clueMap) : dailyKey(SHUFFLE_KEY, clueMap);
  return clueMap[key];
}

export const clueId = MIDNIGHT.diff(LAUNCH_DAY, "day");
