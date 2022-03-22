import { useState } from "react";
import diagram from "../images/Female internal/Diagram.png";
import labels from "../images/Female internal";
import { today } from "../util/dates";
import type { FormEvent } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Button from "../componenets/Button";
import parts from "../data/parts.json";
import { Link } from "react-router-dom";
import { Part, StoredGuesses } from "../lib/types";
import { answer } from "../util/answer";

// const parts: Part[] = untypedParts;

export default function Game() {
  const [guessName, setGuessName] = useState("");
  const [error, setError] = useState("");
  const [win, setWin] = useState("");
  const [female, setFemale] = useState(true);
  const [internal, setInternal] = useState(true);
  const [storedGuesses, storeGuesses] = useLocalStorage<StoredGuesses>(
    "guesses",
    {
      day: today,
      guesses: [],
    }
  );
  const [guesses, setGuesses] = useState<Part[]>(storedGuesses.guesses);

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
    }
    return validGuess;
  }

  function addGuess(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    let validGuess = runChecks();
    if (validGuess) {
      setGuesses([...guesses, validGuess]);
      setGuessName("");
    }
  }

  function ButtonSwitch({ win }: { win: string }) {
    if (!win) {
      return (
        <Button text="Enter" colour="pink" inverted={false} size="small" />
      );
    }
    return (
      <Link to="/stats">
        <Button text="Share" colour="#90ee90" inverted={false} size="small" />
      </Link>
    );
  }

  return (
    <div>
      <form onSubmit={addGuess} className="mt-5 mb-8 space-y-6">
        <div className="flex justify-center">
          <input
            type="text"
            value={guessName}
            onChange={(e) => setGuessName(e.currentTarget.value)}
            autoComplete="new-password"
            disabled={!!win}
            className="border-[1px] border-black mx-2 px-2 py-1 bg-white w-full sm:w-fit"
          />
          <ButtonSwitch win={win} />
        </div>
        {!!error && (
          <p className="text-center mt-8 text-red-700 font-bold">{error}</p>
        )}
        {!!win && (
          <p className="text-center mt-4 text-green-700 font-bold">{win}</p>
        )}
      </form>
      <div className="relative h-[173px] sm:h-[250px]">
        <img
          src={diagram}
          alt="Female Internal"
          className="absolute top-0 left-0"
        />
        {guesses.length >= 1 &&
          guesses.map(({ name }) => {
            if (name in labels) {
              return (
                <img
                  key={name}
                  src={labels[name]}
                  alt={name}
                  className="absolute top-0 left-0"
                  style={{ filter: "contrast(20%)" }}
                />
              );
            }
          })}
      </div>

      <div className="flex w-full justify-around items-center h-[52px] text-sm sm:text-base">
        <div className="flex h-fit space-x-4 sm:space-x-8 px-4 sm:px-7 py-2 justify-around bg-white border-gray-700 border-[1px] rounded-full">
          <p
            onClick={() => setFemale(true)}
            style={{
              fontWeight: female ? "bold" : "",
              color: female ? "orange" : "",
              cursor: "pointer",
            }}
          >
            Female
          </p>
          <p
            onClick={() => setFemale(false)}
            style={{
              fontWeight: female ? "" : "bold",
              color: female ? "" : "blue",
              cursor: "pointer",
            }}
          >
            Male
          </p>
        </div>
        <div className="flex h-fit space-x-4 sm:space-x-8 px-4 sm:px-7 py-2 justify-around bg-white border-gray-700 border-[1px] rounded-full">
          <p
            onClick={() => setInternal(true)}
            style={{
              fontWeight: internal ? "bold" : "",
              cursor: "pointer",
            }}
          >
            Internal
          </p>
          <p
            onClick={() => setInternal(false)}
            style={{
              fontWeight: internal ? "" : "bold",
              cursor: "pointer",
            }}
          >
            External
          </p>
        </div>
      </div>
      <p className="mt-line-height">Clue: {answer.clue}</p>
      <ul className="grid grid-cols-3 md:grid-cols-4 gap-x-3 mt-line-height">
        {guesses &&
          guesses.map(({ name }) => {
            return (
              <li
                key={name}
                className="mb-line-height px-1 text-sm leading-line-height"
              >
                {name}
              </li>
            );
          })}
      </ul>

      {/* <button
        onClick={() => {
          setGuesses([]);
          setWin("");
        }}
        className="mt-line-height text-red-700"
      >
        Clear list
      </button> */}
    </div>
  );
}
