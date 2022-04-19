import dayjs from "dayjs";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { StatTable } from "../lib/types";
import { isFirefox, isMobile } from "react-device-detect";
import { useState } from "react";
import Button from "../componenets/Button";
import Switch from "../componenets/Switch";
import Chart from "../componenets/Chart";
import { Link } from "react-router-dom";
import { generateAnswer } from "../util/answer";

// TODO Make the share message include your "path"

export default function Stats() {
  const [hardMode, setHardMode] = useState(false);

  const initialStats = {
    gamesWon: 0,
    lastWin: dayjs(),
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

  const { usedGuesses, lastWin, gamesWon, currentStreak, maxStreak } =
    storedStats;
  const wonToday = dayjs().diff(dayjs(lastWin), "day") <= 1;
  const sumGuesses = usedGuesses.reduce((a, b) => a + b, 0);
  const todaysGuesses = wonToday ? usedGuesses[usedGuesses.length - 1] : "--";
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
    }
  }

  async function shareScore() {
    let shareString = `${dayjs()}
Today's guesses: ${todaysGuesses}
Current streak: ${currentStreak}
Average guesses: ${showAvgGuesses}`;

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

  return (
    <main className="mt-line-height mx-3">
      <section className="flex flex-col sm:flex-row items-center sm:items-start justify-around w-full">
        <div className="flex flex-col justify-center w-fit">
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
          {msg && <p className="mt-5">{msg}</p>}
        </div>
        <div className="flex flex-col justify-center w-fit mt-5">
          <Switch on={hardMode} setOn={setHardMode} />
          <div className="flex mt-4 justify-center">
            <Link to={`/game?practice_mode=true&hard_mode=${hardMode}`}>
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
        </div>
      </section>
      <section>
        <div>
          <Chart games={storedStats.games} />
        </div>
      </section>
      <section className="mt-10 flex flex-col justify-center space-y-8">
        <p className="text-center">
          Need to brush up on your sex ed? Here’s a good place to start:
        </p>
        <Button
          colour="#FFC8FF"
          size="large"
          inverted={false}
          fn={() => console.log(true)}
        >
          A Sexplanation
        </Button>
      </section>
    </main>
  );
}
