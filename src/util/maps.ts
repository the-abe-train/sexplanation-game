import invariant from "tiny-invariant";
import { Layer, Part } from "../lib/types";

// TODO remove parts without diagrams from parts.json
const parts: Part[] = require("../data/parts.json");

export function mapNameToPart(names: string[]) {
  return names.map((name) => {
    const part = parts.find((part) => name === part.name);
    invariant(part, "Error mapping local storage to parts list");
    return part;
  });
}

export function diagramMatch(answerPart: Part, guessPart: Part) {
  return !!answerPart?.diagrams.some((answerDiagram) => {
    return guessPart.diagrams.includes(answerDiagram);
  });
}

export function mapGuessesToScore(guesses: Part[], answerName: string) {
  const answerPart = parts.find((part) => answerName === part.name);
  invariant(answerPart, "Error mapping local storage to parts list");
  const colours = guesses.map((guess) => {
    let colour: string;
    colour = diagramMatch(answerPart, guess) ? "🟨" : "🟥";
    colour = guess.name === answerPart.name ? "🟩" : colour;
    return colour;
  });
  return colours.join("");
}
