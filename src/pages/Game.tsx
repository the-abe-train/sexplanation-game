import { useEffect, useState } from "react";

import dayjs from "dayjs";
import invariant from "tiny-invariant";

import Clue from "../componenets/Clue";
import Diagram from "../componenets/Diagram";

import { answer } from "../util/answer";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Part, StatTable, StoredGuesses } from "../lib/types";
import Guesser from "../componenets/Guesser";
const parts: Part[] = require("../data/parts.json");

export default function Game() {
  // State hooks
  const [error, setError] = useState("");
  const [highlight, setHighlight] = useState("");

  // Localstorage hooks
  const initialGuesses = { day: dayjs(), guesses: [] };
  const [storedGuesses, storeGuesses] = useLocalStorage<StoredGuesses>(
    "guesses",
    initialGuesses
  );
  const storedParts = storedGuesses.guesses.map((guess) => {
    const part = parts.find((part) => guess === part.name);
    invariant(part, "Error mapping local storage to parts list");
    return part;
  });

  // const x = storedParts.filter(a => !!a)
  const [guesses, setGuesses] = useState<Part[]>(storedParts);
  const initialStats = {
    gamesWon: 0,
    lastWin: dayjs("2022-01-01"),
    currentStreak: 0,
    maxStreak: 0,
    usedGuesses: [],
    emojiGuesses: "",
    games: [],
  };
  const [storedStats, storeStats] = useLocalStorage<StatTable>(
    "statistics",
    initialStats
  );
  const alreadyWon = !!guesses.find((guess) => guess.name === answer.part);
  const initialWin = alreadyWon ? `The answer was ${answer.part}.` : "";
  const [gameOver, setGameOver] = useState(alreadyWon);
  const [win, setWin] = useState(initialWin);

  // Losing the game
  useEffect(() => {
    if (guesses.length >= 6 && !win) {
      setError(`The answer was ${answer.part}.`);
      setGameOver(true);
    }
  }, [guesses, win]);

  // Storing new stats when the game ends
  useEffect(() => {
    const newWin = dayjs().diff(dayjs(storedStats.lastWin), "day") > 1;
    if (win && newWin) {
      const lastWin = dayjs();
      const gamesWon = storedStats.gamesWon + 1;
      const streakBroken = storedStats.lastWin > lastWin;
      const currentStreak = streakBroken ? 1 : storedStats.currentStreak + 1;
      const maxStreak =
        currentStreak > storedStats.maxStreak
          ? currentStreak
          : storedStats.maxStreak;
      const usedGuesses = [...storedStats.usedGuesses, guesses.length];
      const chunks = [];
      for (let i = 0; i < guesses.length; i += 8) {
        chunks.push([...guesses].slice(i, i + 8));
      }
      const game = {
        guesses: guesses.length,
        win: !!win,
        date: dayjs(),
      };
      const games = [...storedStats.games, game];
      const newStats = {
        lastWin,
        gamesWon,
        currentStreak,
        maxStreak,
        usedGuesses,
        games,
      };
      storeStats(newStats);
    }
  }, [win, storeStats, guesses]);

  // When there's a new guess, update the local storage guesses
  useEffect(() => {
    storeGuesses({
      day: dayjs(),
      guesses: guesses.map((guess) => guess.name),
    });
  }, [guesses]);

  // Props to pass to Guesser
  const guesserProps = {
    setError,
    error,
    setGuesses,
    setHighlight,
    guesses,
    setWin,
    setGameOver,
    win,
    gameOver,
    answer,
  };

  // Props to pass to Diagram
  const diagramProps = {
    guesses,
    highlight,
    setHighlight,
    gameOver,
  };

  // TODO ask kylie to move labels from vulva to clitoris to save space and make the clitoris diagram more clear
  // TODO swap foreskin diagrams mobile to desktop
  // TODO we don't want testicles, just testis
  // TODO hard mode is no dropdown

  return (
    <div>
      <Guesser {...guesserProps} />
      <Diagram {...diagramProps} />
      <Clue />
      <ul className="grid grid-cols-3 md:grid-cols-4 gap-x-3 mt-4">
        {guesses &&
          guesses.map(({ name }) => {
            return (
              <li
                key={name}
                className="mb-line-height px-1 leading-line-height cursor-pointer w-fit"
                onClick={() => setHighlight(name)}
                onKeyDown={(e) => {
                  return (
                    ["Enter", "Return", " "].includes(e.key) &&
                    setHighlight(name)
                  );
                }}
                tabIndex={0}
                style={{ fontWeight: name === highlight ? "bold" : "" }}
              >
                {name}
              </li>
            );
          })}
      </ul>
      <p className="mt-line-height">Remaining guesses: {6 - guesses.length}</p>
      <button
        onClick={() => {
          setGuesses([]);
          setWin("");
        }}
        className="mt-line-height text-red-700"
      >
        Clear list
      </button>
      <button
        onClick={() => {
          // const names = parts.map(part => part.name)
          setGuesses(parts);
          setWin("You cheated!");
        }}
        className="mt-line-height text-blue-700 ml-8"
      >
        Select all
      </button>
    </div>
  );
}
