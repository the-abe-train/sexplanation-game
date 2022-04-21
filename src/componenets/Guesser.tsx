import { FormEvent, useContext, useEffect, useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import Button from "../componenets/Button";
import { Part } from "../lib/types";
import { ModeContext } from "../context/ModeContext";
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

type InputPros = {
  gameOver: boolean;
  guessName: string;
  setGuessName: React.Dispatch<React.SetStateAction<string>>;
};

function Input({ gameOver, setGuessName, guessName }: InputPros) {
  const { mode } = useContext(ModeContext);
  const options = parts
    .map((part) => part.name)
    .filter((value, idx, self) => {
      return self.indexOf(value) === idx;
    })
    .map((name) => {
      return { value: name, label: name };
    });
  return mode.hardMode ? (
    <input
      type="text"
      className="w-full max-w-[250px] z-20 border-[1px] rounded border-black 
      px-2 bg-white disabled:bg-gray-300"
      onChange={(e) => setGuessName(e.target.value || "")}
      disabled={gameOver}
      value={guessName}
    />
  ) : (
    <Select
      options={options}
      onChange={(e) => setGuessName(e?.value || "")}
      isDisabled={gameOver}
      className="w-full max-w-[250px] z-20 border-[1px] rounded border-black "
      autoFocus
      placeholder=""
      isClearable
      closeMenuOnSelect
    />
  );
}

type Props = {
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
  const [error, setError] = useState("");

  // Losing the game
  useEffect(() => {
    if (guesses.length >= 6 && !win) {
      setError(`The answer was ${answer.part}.`);
      setGameOver(true);
    }
  }, [guesses, win]);

  // Entering a new guess
  function addGuess(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    let validGuess = runChecks();
    if (validGuess) {
      setGuesses([...guesses, validGuess]);
      setGuessName("");
      if (!gameOver) setHighlight(validGuess.name);
    }
  }

  // Form validation
  function runChecks() {
    console.log("Guess name;", guessName);
    const userGuess = guessName.trim().toLowerCase();
    const alreadyGuessed = guesses.find((guess) => {
      return guess.name.toLowerCase() === userGuess;
    });
    if (alreadyGuessed) {
      setError(`You already guessed ${guessName}`);
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

  // Clicking the final message should take you to the answer diagram
  function revealAnswer() {
    if (gameOver) {
      setHighlight(answer.part);
    }
  }

  return (
    <form onSubmit={addGuess} className="mt-5">
      <div className="flex justify-center space-x-3">
        <Input
          gameOver={gameOver}
          setGuessName={setGuessName}
          guessName={guessName}
        />
        <ButtonSwitch gameOver={gameOver} />
      </div>

      {!!error && (
        <p
          className="text-center text-red-700 font-bold my-3"
          style={{ cursor: gameOver ? "pointer" : "auto" }}
          onClick={revealAnswer}
        >
          {error}
        </p>
      )}
      {!!win && (
        <p
          className="text-center text-green-700 font-bold my-3"
          style={{ cursor: gameOver ? "pointer" : "auto" }}
          onClick={revealAnswer}
        >
          {win}
        </p>
      )}
    </form>
  );
}
