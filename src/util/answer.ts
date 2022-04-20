import { Part } from "../lib/types";

const parts: Part[] = require("../data/parts.json");

const SHUFFLE_KEY = 1337;

function dailyKey(list: any[]) {
  const today = new Date().toLocaleDateString("en-CA");
  const [year, month, date] = today.split("-");
  const dayCode = Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(date));
  const key = Math.floor(dayCode / parseInt(SHUFFLE_KEY + "5")) % list.length;
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
  const key = random ? randomKey(clueMap) : dailyKey(clueMap);
  return clueMap[key];
}
