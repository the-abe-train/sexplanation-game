import dayjs from "dayjs";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { StatTable, StoredGuesses } from "../lib/types";
import { isFirefox, isMobile } from "react-device-detect";
import { useState } from "react";
import Button from "../componenets/Button";
import Switch from "../componenets/Switch";
import Chart from "../componenets/Chart";
import { Link } from "react-router-dom";
import { clueId, generateAnswer } from "../util/answer";
import { mapGuessesToScore, mapNameToPart } from "../util/maps";
import photo from "../images/photos/Genitle-with-tape.png";

// Styles
import styles from "../styles/button.module.css";
import { MIDNIGHT, NOW } from "../util/contstants";

export default function Stats() {
  // Guesses from local storage
  const initialGuesses = {
    expiration: MIDNIGHT,
    guesses: [],
  };
  const [storedGuesses, storeGuesses] = useLocalStorage<StoredGuesses>(
    "guesses",
    initialGuesses
  );
  const storedParts = mapNameToPart(storedGuesses.guesses);

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
  const [msg, setMsg] = useState("");

  const { usedGuesses, lastGame, gamesWon, currentStreak, maxStreak } =
    storedStats;
  const newGame = NOW.diff(dayjs(lastGame), "day") <= 1;
  const sumGuesses = usedGuesses.reduce((a, b) => a + b, 0);
  const todaysGuesses = newGame ? usedGuesses[usedGuesses.length - 1] : "--";
  const avgGuesses = Math.round((sumGuesses / usedGuesses.length) * 100) / 100;
  const showAvgGuesses = usedGuesses.length === 0 ? "--" : avgGuesses;

  const data = [
    { name: "Today's guesses", value: todaysGuesses },
    { name: "Games won", value: gamesWon },
    { name: "Current streak", value: currentStreak },
    { name: "Max streak", value: maxStreak },
  ];

  function resetScore() {
    const ans = window.confirm("Are you sure you want to reset your score?");
    if (ans) {
      storeStats(initialStats);
      storeGuesses(initialGuesses);
    }
  }

  async function shareScore() {
    const answer = generateAnswer();
    const colours = mapGuessesToScore(storedParts, answer.part);
    let shareString = `#Genitle Clue ${clueId}: ${answer.clue}
🔥${currentStreak} | Avg. Guesses: ${showAvgGuesses}
${colours} = ${todaysGuesses}

Want to guess? genitle.herraproductions.com`;
    console.log(shareString);

    if ("canShare" in navigator && isMobile && !isFirefox) {
      return await navigator.share({
        title: "Sexplanation Game Stats",
        text: shareString,
      });
    } else {
      // setQuestion(false);
      setMsg("Copied to clipboard!");
      setTimeout(() => setMsg(""), 2000);
      if ("clipboard" in navigator) {
        return await navigator.clipboard.writeText(shareString);
      } else {
        return document.execCommand("copy", true, shareString);
      }
    }
  }

  function enterPracticeMode() {
    const practiceAnswer = generateAnswer(true);
    localStorage.setItem("practice", JSON.stringify(practiceAnswer));
  }

  // Styles
  const { button, bg, photos } = styles;

  return (
    <main className="sm:mt-line-height mx-3 space-y-9">
      <section
        className="flex flex-col sm:flex-row items-center sm:items-start 
      justify-around w-full space-y-3"
      >
        <div className="flex flex-col justify-center w-fit my-auto">
          <table className="text-base table-auto w-full">
            <tbody>
              {data.map(({ name, value }) => {
                return (
                  <tr key={name} className="h-line-height">
                    <td>{name}</td>
                    <td className="text-right">{value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex mt-[20px] items-center space-x-4">
            <Button
              colour="#FFC8FF"
              size="small"
              inverted={false}
              fn={shareScore}
            >
              Share score
            </Button>
            <button
              className="text-left text-sm hover:shadow-none text-red-700"
              onClick={resetScore}
            >
              Reset
            </button>
          </div>
          {msg && (
            <p className="mt-5 font-bold" style={{ color: "teal" }}>
              {msg}
            </p>
          )}
        </div>
        <div>
          <Chart games={storedStats.games} />
        </div>
      </section>
      <section className="flex flex-col justify-center w-fit mt-5 mx-auto">
        <Switch />
        <div className="flex mt-4 justify-center">
          <Link to={`/game?practice_mode=true`}>
            <Button
              colour="#FFC8FF"
              size="small"
              inverted={false}
              fn={enterPracticeMode}
            >
              Practice game
            </Button>
          </Link>
        </div>
      </section>
      <section className="flex flex-col justify-center space-y-4 mb-8">
        <p className="text-center">
          Did your sex ed leave much to be desired? We decided to get a good
          one—no matter how awkward.
        </p>
        <div className="relative">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-10">
            <Button
              colour="#FFC8FF"
              size="big"
              inverted={false}
              fn={() => console.log(true)}
            >
              Watch how
            </Button>
          </div>
          <div className={photos}>
            <img src={photo} alt="Alex at the park" />
          </div>
        </div>
      </section>
    </main>
  );
}
