import { useEffect, useState } from "react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import Clue from "../componenets/Clue";
import Diagram from "../componenets/Diagram";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { Part, StatTable, StoredGuesses, Answer, Layer } from "../lib/types";
import Guesser from "../componenets/Guesser";
import { useNavigate, useSearchParams } from "react-router-dom";
import { generateAnswer } from "../util/answer";
import { mapNameToPart } from "../util/maps";
import Button from "../componenets/Button";
import { orange, purple, teal } from "../util/colours";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Game() {
  // Navigate
  const navigate = useNavigate();

  // State hooks
  const [highlight, setHighlight] = useState("");
  const [error, setError] = useState("");
  const [layer, setLayer] = useState<Layer>("Vulva");
  const [sex, setSex] = useState<"Male" | "Female">("Female");

  // Search params
  const [params] = useSearchParams();
  const practiceMode = !!params.get("practice_mode");
  const practiceAnswer = JSON.parse(
    localStorage.getItem("practice") || "false"
  );

  // Answer
  const answer: Answer =
    practiceMode && practiceAnswer ? practiceAnswer : generateAnswer();

  // Guesses from local storage
  const today = dayjs();
  const initialGuesses = {
    expiration: dayjs().tz("America/Toronto").endOf("day"),
    guesses: [],
  };
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
    lastGame: dayjs("2022-01-01"),
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

  // Storing new stats when the game ends
  useEffect(() => {
    const newGame = dayjs().diff(dayjs(storedStats.lastGame), "day") > 1;
    if (win && newGame) {
      const lastGame = dayjs();
      const gamesWon = storedStats.gamesWon + 1;
      const currentStreak = storedStats.currentStreak + 1;
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
        lastGame,
        gamesWon,
        currentStreak,
        maxStreak,
        usedGuesses,
        games,
      };
      storeStats(newStats);
    } else if (gameOver && newGame) {
      const { gamesWon, maxStreak } = storedStats;
      const usedGuesses = [...storedStats.usedGuesses, guesses.length];
      const game = {
        guesses: guesses.length,
        win: false,
        date: dayjs(),
      };
      const games = [...storedStats.games, game];
      const newStats = {
        lastGame: dayjs(),
        gamesWon,
        currentStreak: 0,
        maxStreak,
        usedGuesses,
        games,
      };
      storeStats(newStats);
    }
  }, [win, storeStats, guesses, gameOver]);

  // When there's a new guess, update the local storage guesses
  useEffect(() => {
    if (!practiceMode) {
      storeGuesses({
        expiration: dayjs().tz("America/Toronto").endOf("day"),
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

  // Practice mode
  function enterPracticeMode() {
    const practiceAnswer = generateAnswer(true);
    localStorage.setItem("practice", JSON.stringify(practiceAnswer));
  }

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
    setError,
    error,
  };

  // Props to pass to Diagram
  const diagramProps = {
    guesses,
    highlight,
    setHighlight,
    gameOver,
    answer,
    setError,
    error,
    layer,
    setLayer,
    sex,
    setSex,
  };

  return (
    <div>
      <Guesser {...guesserProps} />
      <Diagram {...diagramProps} />
      <Clue answer={answer} />
      <ul className="grid grid-cols-3 md:grid-cols-4 gap-x-3 mt-line-height">
        {guesses.map(({ name, diagrams }) => {
          return (
            <li
              key={name}
              className="mb-line-height px-1 leading-line-height cursor-pointer w-fit"
              onClick={() => setHighlight(name)}
              onKeyDown={(e) => {
                return (
                  ["Enter", "Return", " "].includes(e.key) && setHighlight(name)
                );
              }}
              tabIndex={0}
              style={{
                fontWeight: name === highlight ? "bold" : "",
                color: diagrams.includes(layer)
                  ? sex === "Female"
                    ? orange
                    : teal
                  : "black",
              }}
            >
              {name}
            </li>
          );
        })}
      </ul>

      <p style={{ marginTop: guesses.length > 0 ? 0 : "13px" }}>
        Remaining guesses: {6 - guesses.length}
      </p>
      {practiceMode && (
        <div className="my-4 flex space-x-4 items-center just">
          <span>You are in practice mode. </span>
          <Button
            colour="#FFC8FF"
            size="small"
            inverted={false}
            fn={() => navigate("/")}
          >
            Exit practice
          </Button>
          <Button
            colour="#FFC8FF"
            size="small"
            inverted={false}
            fn={enterPracticeMode}
          >
            New practice
          </Button>
        </div>
      )}
    </div>
  );
}
