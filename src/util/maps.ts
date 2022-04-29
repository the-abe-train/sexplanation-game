import invariant from "tiny-invariant";
import { DiagramInfo, Layer, Part, Sex } from "../lib/types";
import { parts } from "../data/parts";

export function mapNameToPart(names: string[]) {
  return names.map((name) => {
    const part = parts.find((part) => name === part.name);
    invariant(part, "Error mapping local storage to parts list");
    return part;
  });
}

// Given 2 parts, if they have any diagrams in common, return them
export function getSharedDiagrams(part1: Part, part2: Part) {
  return part1.diagrams.filter((diagram1) => {
    return part2.diagrams.some((diagram2) => {
      return diagram1.sex === diagram2.sex && diagram1.layer === diagram2.layer;
    });
  });
}

export function mapGuessesToScore(guesses: Part[], answerName: string) {
  const answerPart = parts.find((part) => answerName === part.name);
  invariant(answerPart, "Error mapping local storage to parts list");
  const colours = guesses.map((guess) => {
    let colour: string;
    colour = getSharedDiagrams(answerPart, guess) ? "🟨" : "🟥";
    colour = guess.name === answerPart.name ? "🟩" : colour;
    return colour;
  });
  return colours.join("");
}

// Given any number of guesses and a diagram, return the names of all guesses
// that are on that diagram
export function getMatchingLabels(guesses: Part[], diagram: DiagramInfo) {
  const showLabels = guesses
    .filter((guess) => {
      return guess.diagrams.some((guessDiagram) => {
        return (
          guessDiagram.sex === diagram.sex &&
          guessDiagram.layer === diagram.layer
        );
      });
    })
    .map((guess) => guess.name);
  return showLabels;
}

// Check whether a given part exists on a given diagram
export function partOnDiagram(part: Part, diagram: DiagramInfo) {
  return part.diagrams.some((partDiagram) => {
    return (
      partDiagram.sex === diagram.sex && partDiagram.layer === diagram.layer
    );
  });
}

// Given a list of diagrams and the current sex & layer, return the diagram
// that is most similar to the current setup
export function bestMatchDiagram(
  diagrams: DiagramInfo[],
  currentDiagram: DiagramInfo
) {
  const { sex, layer } = currentDiagram;
  const order = diagrams.sort((a, z) => {
    if (a.sex === sex && a.layer === layer) {
      return 1;
    } else if (z.sex === sex && z.layer === layer) {
      return 0;
    } else if (a.sex === sex) {
      return 1;
    } else if (z.sex === sex) {
      return 0;
    } else {
      return 1;
    }
  });
  return order[0];
}
