import { useEffect, useState } from "react";
// import { today } from "../util/dates";
import type { FormEvent } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Button from "../componenets/Button";
import parts from "../data/parts.json";
import { Link } from "react-router-dom";
import { Part, Stats, StoredGuesses } from "../lib/types";
import Select from "react-select";
import Clue from "../componenets/Clue";
import { answer } from "../util/answer";
import Diagram from "../componenets/Diagram";
import dayjs from "dayjs";
import invariant from "tiny-invariant";

// TODO change labels from PNGs to SVGs
// TODO I want to be able to click on labels to highlight the parts.
// This can be done with SVGs and pointer event CSS

export default function Game() {
  // State hooks
  const [guessName, setGuessName] = useState("");
  const [error, setError] = useState("");
  const [highlight, setHighlight] = useState("");

  // Localstorage hooks
  const initialGuesses = { day: dayjs(), guesses: [] };
  const [storedGuesses, storeGuesses] = useLocalStorage<StoredGuesses>(
    "guesses",
    initialGuesses
  );
  const storedParts = storedGuesses.guesses.map((guess) => {
    console.log(guess);
    const part = parts.find((part) => guess === part.name);
    invariant(part, "Error mapping local storage to parts list");
    return part;
  });

  // const x = storedParts.filter(a => !!a)
  const [guesses, setGuesses] = useState<Part[]>(storedParts);
  const initialStats = {
    gamesWon: 0,
    lastWin: dayjs(),
    currentStreak: 0,
    maxStreak: 0,
    usedGuesses: [],
    emojiGuesses: "",
  };
  const [storedStats, storeStats] = useLocalStorage<Stats>(
    "statistics",
    initialStats
  );
  const [stats, setStats] = useState<string[]>(storedGuesses.guesses);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState("");

  // Storing the guesses in local storage
  // useEffect(() => {
  //   storeGuesses({
  //     day: dayjs(),
  //     guesses,
  //   });
  // }, [guesses, storeGuesses]);

  // Losing the game
  useEffect(() => {
    if (guesses.length >= 6 && !win) {
      setError(`The answer was ${answer.name}.`);
      setGameOver(true);
    }
  }, [guesses, win]);

  // When the game ends
  useEffect(() => {
    console.log("When the game ends");
    if (!!win) {
      const lastWin = dayjs();
      const gamesWon = storedStats.gamesWon + 1;
      // const streakBroken = dateDiffInDays(storedStats.lastWin, lastWin) > 1;
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
      const newStats = {
        lastWin: dayjs(),
        gamesWon,
        currentStreak,
        maxStreak,
        usedGuesses,
      };
      storeStats(newStats);
    }
  }, [win, storeStats, guesses]);

  // Form validation
  function runChecks() {
    const userGuess = guessName.trim().toLowerCase();
    const alreadyGuessed = guesses.find((guess) => {
      return guess.name.toLowerCase() === userGuess;
    });
    if (alreadyGuessed) {
      setError("Already guessed");
      return;
    }
    const validGuess = parts.find((guess) => {
      return (
        guess.name.toLowerCase() === userGuess ||
        guess.alternate_names
          .map((alt) => alt.toLowerCase())
          .includes(userGuess)
      );
    });
    if (!validGuess) {
      setError("Invalid guess");
      return;
    }
    if (answer.name.toLowerCase() === userGuess) {
      setWin(`The answer is ${userGuess}!`);
      setGameOver(true);
    }
    return validGuess;
  }

  // Entering a new guess
  function addGuess(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    let validGuess = runChecks();
    if (validGuess) {
      setGuesses([...guesses, validGuess]);
      storeGuesses({
        day: dayjs(),
        guesses: guesses.map((guess) => guess.name),
      });
      setGuessName("");
      setHighlight(validGuess.name);
    }
  }

  // Changing the button form "Enter" to "Share" when the game ends
  function ButtonSwitch({ gameOver }: { gameOver: boolean }) {
    if (!gameOver) {
      return (
        <Button
          children="Enter"
          colour="#FFC8FF"
          inverted={false}
          size="small"
        />
      );
    }
    return (
      <Link to="/stats">
        <Button colour="#90ee90" inverted={false} size="small">
          Share
        </Button>
      </Link>
    );
  }

  const options = parts.map((part) => {
    return { value: part.name, label: part.name };
  });

  return (
    <div>
      <form onSubmit={addGuess} className="mt-5 mb-8 space-y-5">
        <div className="flex justify-center">
          <Select
            options={options}
            onChange={(e) => setGuessName(e?.value || "")}
            isDisabled={gameOver}
            className="w-full max-w-[250px] z-20"
          />
          <ButtonSwitch gameOver={gameOver} />
        </div>

        {!!error && (
          <p className="text-center text-red-700 font-bold">{error}</p>
        )}
        {!!win && <p className="text-center text-green-700 font-bold">{win}</p>}
      </form>
      <Diagram guesses={guesses} highlight={highlight} />
      <Clue />
      <ul className="grid grid-cols-3 md:grid-cols-4 gap-x-3 mt-7">
        {guesses &&
          guesses.map(({ name }) => {
            return (
              <li
                key={name}
                className="mb-line-height px-1 leading-line-height cursor-pointer w-fit"
                onClick={() => setHighlight(name)}
              >
                {name}
              </li>
            );
          })}
        {win &&
          parts
            .filter((part) => !guesses.includes(part))
            .map(({ name }) => {
              return (
                <li
                  key={name}
                  className="mb-line-height px-1 text-sm leading-line-height cursor-pointer w-fit text-red-900"
                  onClick={() => setHighlight(name)}
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
