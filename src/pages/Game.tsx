import { useState } from "react";
import vagina from "../images/female_internal.png";
import { today } from "../util/dates";
import type { FormEvent } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Button from "../componenets/Button";

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
    const alreadyGuessed = guesses.find((guess) => guess === userGuess);
    if (alreadyGuessed) {
      setError("Already guessed");
      return;
    }
    const validGuess = answers.find((guess) => guess === userGuess);
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
      setGuesses([...guesses, validGuess]);
      setGuessName("");
    }
  }

  return (
    <div>
      <form onSubmit={addGuess} className="my-8 space-y-4">
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
      <img src={vagina} alt="Female Internal" />
    </div>
  );
}
