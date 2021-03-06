import { useEffect, useMemo, useReducer, useState } from "react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import Clue from "../componenets/Clue";
import Diagram from "../componenets/Diagram";

import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  Part,
  StatTable,
  StoredGuesses,
  Answer,
  Layer,
  Highlight,
} from "../lib/types";
import Guesser from "../componenets/Guesser";
import { useNavigate, useSearchParams } from "react-router-dom";
import { generateAnswer } from "../util/answer";
import { mapNameToPart } from "../util/maps";
import Button from "../componenets/Button";
import { orange, teal } from "../util/colours";
import { MIDNIGHT, NOW } from "../util/contstants";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Game() {
  // Navigate
  const navigate = useNavigate();

  // State hooks
  const [highlight, setHighlight] = useState<Highlight>({
    name: "Vagina",
    source: "label",
  });
  const [error, setError] = useState("");
  const [layer, setLayer] = useState<Layer>("Outside");
  const [sex, setSex] = useState<"Male" | "Female">("Female");

  // Reducer hook

  // type ReducerState = {
  //   name:
  // }

  // const initialHighlight = {count: 0};

  // function highlightReducer(state: { count: number; }, action: { type: any; }) {
  //   switch (action.type) {
  //     case 'increment':
  //       return {count: state.count + 1};
  //     case 'decrement':
  //       return {count: state.count - 1};
  //     default:
  //       throw new Error();
  //   }
  // }

  // const [highlight, highlightDispatch] = useReducer(highlightReducer, initialHighlight);

  // Search params
  const [params] = useSearchParams();
  const practiceMode = !!params.get("practice_mode");
  const practiceAnswer = JSON.parse(
    localStorage.getItem("practice") || "false"
  );

  // Answer
  const answer: Answer =
    practiceMode && practiceAnswer ? practiceAnswer : generateAnswer();

  // If player has never been to the site before, redirect them to home page so
  // that they can see the disclaimer
  useEffect(() => {
    const readDisclaimer = localStorage.getItem("read_disclaimer");
    if (!readDisclaimer) {
      navigate("/");
    }
  }, [navigate]);

  // Guesses from local storage
  const expiration = MIDNIGHT;
  const initialGuesses = { expiration, guesses: [] };
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
  const storedStatsCopy = useMemo(() => storedStats, [storedStats]);
  useEffect(() => {
    const lastGameDate = dayjs(storedStatsCopy.lastGame)
      .tz("America/Toronto")
      .endOf("day");
    const newGame = lastGameDate < NOW;
    if (win && newGame) {
      const lastGame = NOW;
      const gamesWon = storedStatsCopy.gamesWon + 1;
      const currentStreak = storedStatsCopy.currentStreak + 1;
      const maxStreak =
        currentStreak > storedStatsCopy.maxStreak
          ? currentStreak
          : storedStatsCopy.maxStreak;
      const usedGuesses = [...storedStatsCopy.usedGuesses, guesses.length];
      const chunks = [];
      for (let i = 0; i < guesses.length; i += 8) {
        chunks.push([...guesses].slice(i, i + 8));
      }
      const game = {
        guesses: guesses.length,
        win: !!win,
        date: NOW,
      };
      const games = [...storedStatsCopy.games, game];
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
      const { gamesWon, maxStreak } = storedStatsCopy;
      const usedGuesses = [...storedStatsCopy.usedGuesses, guesses.length];
      const game = {
        guesses: guesses.length,
        win: false,
        date: NOW,
      };
      const games = [...storedStatsCopy.games, game];
      const newStats = {
        lastGame: NOW,
        gamesWon,
        currentStreak: 0,
        maxStreak,
        usedGuesses,
        games,
      };
      storeStats(newStats);
    }
  }, [win, storeStats, storedStatsCopy, guesses, gameOver]);

  // When there's a new guess, update the local storage guesses
  useEffect(() => {
    if (!practiceMode) {
      storeGuesses({
        expiration: MIDNIGHT,
        guesses: guesses.map((guess) => guess.name),
      });
    }
  }, [guesses, practiceMode, storeGuesses]);

  // When the game is over
  useEffect(() => {
    if (gameOver) {
      setHighlight({ name: answer.part, source: "gameOver" });
    }
  }, [gameOver, answer]);

  // Practice mode
  function enterPracticeMode() {
    const practiceAnswer = generateAnswer(true);
    localStorage.setItem("practice", JSON.stringify(practiceAnswer));
    window.location.reload();
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
      <ul className="grid grid-cols-3 md:grid-cols-4 gap-x-3 mt-[13px]">
        {guesses.map(({ name, diagrams }) => {
          const layers = diagrams.map((diagram) => diagram.layer);
          const sexes = diagrams.map((diagram) => diagram.sex);
          return (
            <li
              key={name}
              className="mb-line-height px-1 leading-line-height cursor-pointer w-fit"
              onClick={() => setHighlight({ name, source: "list" })}
              onKeyDown={(e) => {
                return (
                  ["Enter", "Return", " "].includes(e.key) &&
                  setHighlight({ name, source: "list" })
                );
              }}
              tabIndex={0}
              style={{
                fontWeight: name === highlight.name ? "bold" : "",
                color:
                  layers.includes(layer) && sexes.includes(sex)
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

      <p style={{ marginTop: guesses.length > 0 ? 0 : "26px" }}>
        Remaining guesses: {6 - guesses.length}
      </p>
      {practiceMode && (
        <div className="my-[25px] flex space-x-4 items-center just">
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
