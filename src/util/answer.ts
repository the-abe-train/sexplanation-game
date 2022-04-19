import { Part } from "../lib/types";

const parts: Part[] = require("../data/parts.json");

// TODO set up answer mechanism like Globle
const SHUFFLE_KEY = 1337;
export const today = new Date().toLocaleDateString("en-CA");

function generateKeyNew(list: any[], day: string) {
  const [year, month, date] = day.split("-");
  const dayCode = Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(date));
  const key = Math.floor(dayCode / parseInt(SHUFFLE_KEY + "5")) % list.length;
  return key;
}

const clues = parts.flatMap((part) => part.clues);

const clueMap = clues.map((clue) => {
  const part = parts.find((part) => part.clues.includes(clue));
  return {
    clue: clue,
    part: part?.name || "",
  };
});

const key = generateKeyNew(clueMap, today);

export const answer = clueMap[key];
