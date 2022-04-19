import { FormEvent, useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import Button from "../componenets/Button";
import { Part } from "../lib/types";
const parts: Part[] = require("../data/parts.json");

// Changing the button form "Enter" to "Share" when the game ends
function ButtonSwitch({ gameOver }: { gameOver: boolean }) {
  if (!gameOver) {
    return (
      <Button children="Enter" colour="#FFC8FF" inverted={false} size="small" />
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

type Props = {
  setError: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  setGuesses: React.Dispatch<React.SetStateAction<Part[]>>;
  guesses: Part[];
  setHighlight: React.Dispatch<React.SetStateAction<string>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  gameOver: boolean;
  setWin: React.Dispatch<React.SetStateAction<string>>;
  win: string;
  answer: {
    clue: string;
    part: string;
  };
};

export default function Guesser({
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
}: Props) {
  // State hooks
  const [guessName, setGuessName] = useState("");

  // Entering a new guess
  function addGuess(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    let validGuess = runChecks();
    if (validGuess) {
      setGuesses([...guesses, validGuess]);
      setGuessName("");
      setHighlight(validGuess.name);
    }
  }

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
      return guess.name.toLowerCase() === userGuess;
    });
    if (!validGuess) {
      setError("Invalid guess");
      return;
    }
    if (answer.part.toLowerCase() === userGuess) {
      setWin(`The answer is ${userGuess}!`);
      setGameOver(true);
    }
    return validGuess;
  }

  const options = parts
    .map((part) => part.name)
    .filter((value, idx, self) => {
      return self.indexOf(value) === idx;
    })
    .map((name) => {
      return { value: name, label: name };
    });

  return (
    <form onSubmit={addGuess} className="mt-5 space-y-5">
      <div className="flex justify-center space-x-3">
        <Select
          options={options}
          onChange={(e) => setGuessName(e?.value || "")}
          isDisabled={gameOver}
          className="w-full max-w-[250px] z-20 border-[1px] rounded border-black "
          autoFocus
          placeholder=""
        />
        <ButtonSwitch gameOver={gameOver} />
      </div>

      {!!error && <p className="text-center text-red-700 font-bold">{error}</p>}
      {!!win && <p className="text-center text-green-700 font-bold">{win}</p>}
    </form>
  );
}
