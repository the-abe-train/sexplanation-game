import { useEffect, useState } from "react";

import dayjs from "dayjs";

import Clue from "../componenets/Clue";
import Diagram from "../componenets/Diagram";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { Part, StatTable, StoredGuesses, Answer } from "../lib/types";
import Guesser from "../componenets/Guesser";
import { useSearchParams } from "react-router-dom";
import { generateAnswer } from "../util/answer";
import { mapNameToPart } from "../util/maps";

export default function Game() {
  // State hooks
  const [highlight, setHighlight] = useState("");

  // Search params
  const [params] = useSearchParams();
  const practiceMode = !!params.get("practice_mode");
  const practiceAnswer = JSON.parse(
    localStorage.getItem("practice") || "false"
  );

  const answer: Answer =
    practiceMode && practiceAnswer ? practiceAnswer : generateAnswer();

  // Guesses from local storage
  const today = dayjs();
  const initialGuesses = { day: today, guesses: [] };
  const [storedGuesses, storeGuesses] = useLocalStorage<StoredGuesses>(
    "guesses",
    initialGuesses
  );
  const storedParts = mapNameToPart(storedGuesses.guesses);
  const [guesses, setGuesses] = useState<Part[]>(
    practiceMode ? [] : storedParts
  );

  // Stats from local storage
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
  // console.log(answer);
  const alreadyWon = !!guesses.find((guess) => guess.name === answer.part);
  const initialWin = alreadyWon ? `The answer was ${answer.part}.` : "";
  const [gameOver, setGameOver] = useState(alreadyWon);
  const [win, setWin] = useState(initialWin);

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
    if (!practiceMode) {
      storeGuesses({
        day: today,
        guesses: guesses.map((guess) => guess.name),
      });
    }
  }, [guesses]);

  // When the game is over
  useEffect(() => {
    if (gameOver) {
      console.log("Answer", answer);
      setHighlight(answer.part);
    }
  }, [gameOver]);

  // Props to pass to Guesser
  const guesserProps = {
    setHighlight,
    setGuesses,
    guesses,
    setWin,
    win,
    setGameOver,
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
  // TODO we don't want testicles, just testis

  return (
    <div>
      <Guesser {...guesserProps} />
      <Diagram {...diagramProps} />
      <Clue answer={answer} />
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
      {/* <button
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
      </button> */}
    </div>
  );
}
