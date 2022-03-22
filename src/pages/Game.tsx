import { useState } from "react";
import diagram from "../images/Female internal/Diagram.png";
// import ovary from "../images/Female internal/Ovary label.png";
import labels from "../images/Female internal";
import { today } from "../util/dates";
import type { FormEvent } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Button from "../componenets/Button";
import parts from "../data/parts.json";

type StoredGuesses = {
  day: string;
  guesses: string[];
};

export default function Game() {
  const [guessName, setGuessName] = useState("");
  const [error, setError] = useState("");
  const [win, setWin] = useState("");
  const [storedGuesses, storeGuesses] = useLocalStorage<StoredGuesses>(
    "guesses",
    {
      day: today,
      guesses: [],
    }
  );
  const [guesses, setGuesses] = useState<string[]>(storedGuesses.guesses);

  const answers = ["vagina"];
  const answer = "vagina";

  function runChecks() {
    const userGuess = guessName.trim().toLowerCase();
    const alreadyGuessed = guesses.find((guess) => {
      return guess.toLowerCase() === userGuess;
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
    if (userGuess === answer) {
      setWin(`The answer is ${answer}`);
    }
    return validGuess;
  }

  function addGuess(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    let validGuess = runChecks();
    if (validGuess) {
      setGuesses([...guesses, validGuess.name]);
      setGuessName("");
    }
  }

  return (
    <div>
      <form onSubmit={addGuess} className="mt-5 mb-8 space-y-4">
        <div className="flex justify-center">
          <input
            type="text"
            value={guessName}
            onChange={(e) => setGuessName(e.currentTarget.value)}
            autoComplete="new-password"
            disabled={!!win}
            className="border-[1px] border-black mx-2 px-2 py-1 bg-white"
          />
          <Button
            text="Enter"
            colour="pink"
            inverted={false}
            size="small"
            disabled={!!win}
          />
        </div>
        {!!error && <p className="text-center">{error}</p>}
        {!!win && <p className="text-center">{win}</p>}
      </form>
      <div className="relative h-[300px]">
        <img
          src={diagram}
          alt="Female Internal"
          className="absolute top-0 left-0"
        />
        {guesses.length >= 1 &&
          guesses.map((guess, idx) => {
            if (guess in labels) {
              return (
                <img
                  key={idx}
                  src={labels[guess]}
                  alt={guess}
                  className="absolute top-0 left-0"
                  style={{ filter: "contrast(20%)" }}
                />
              );
            }
          })}
      </div>
      <ul className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {guesses &&
          guesses.map((guess) => {
            return <li>{guess}</li>;
          })}
      </ul>
      <button
        onClick={() => {
          setGuesses([]);
          setWin("");
        }}
        className="mt-10 text-red-700"
      >
        Clear list
      </button>
    </div>
  );
}
