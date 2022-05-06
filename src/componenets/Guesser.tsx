import { FormEvent, useContext, useEffect, useState } from "react";
import Select, { createFilter } from "react-select";
import { Link } from "react-router-dom";
import Button from "../componenets/Button";
import { Highlight, Part } from "../lib/types";
import { ModeContext } from "../context/ModeContext";
import { getSharedDiagrams } from "../util/maps";
import invariant from "tiny-invariant";
import { errorRed, grayMessage, seaGreen, warmYellow } from "../util/colours";
import { parts } from "../data/parts";

// Changing the button form "Enter" to "Share" when the game ends
function ButtonSwitch({ gameOver }: { gameOver: boolean }) {
  if (!gameOver) {
    return (
      <Button children="Enter" colour="#FFC8FF" inverted={false} size="small" />
    );
  }
  return (
    <Link to="/stats">
      <Button colour={seaGreen} inverted={false} size="small">
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
    .sort((a, z) => a.localeCompare(z))
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
      filterOption={createFilter({ matchFrom: "start" })}
    />
  );
}

type Props = {
  setGuesses: React.Dispatch<React.SetStateAction<Part[]>>;
  guesses: Part[];
  setHighlight: React.Dispatch<React.SetStateAction<Highlight>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  gameOver: boolean;
  setError: React.Dispatch<React.SetStateAction<string>>;
  error: string;
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
  setError,
  error,
}: Props) {
  // State hooks
  const [guessName, setGuessName] = useState("");
  // const [message, setMessage] = useState("");
  const [errorColour, setErrorColour] = useState("gray");

  // Before your first guess
  useEffect(() => {
    if (guesses.length === 0 && !win && !error) {
      setError("Use the textbox to enter your first guess!");
      setErrorColour(grayMessage);
    }
  }, [guesses.length, win, error, setError]);

  // Losing the game
  useEffect(() => {
    if (guesses.length >= 6 && !win) {
      setError(`The answer was ${answer.part}.`);
      setErrorColour(seaGreen);
      setGameOver(true);
    }
  }, [guesses, win, answer.part, setError, setGameOver]);

  // Entering a new guess
  function addGuess(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    let validGuess = runChecks();
    if (validGuess) {
      setGuesses([...guesses, validGuess]);
      setGuessName("");
      if (!gameOver) setHighlight({ name: validGuess.name, source: "guess" });
    }
  }

  // Form validation
  function runChecks() {
    const userGuess = guessName.trim().toLowerCase();

    // Invalid guess
    const validGuess = parts.find((guess) => {
      return guess.name.toLowerCase() === userGuess;
    });
    if (!validGuess) {
      setError("Invalid guess");
      setErrorColour(errorRed);
      return;
    }

    // Win condition
    if (answer.part.toLowerCase() === userGuess) {
      setWin(`The answer is ${userGuess}!`);
      setGameOver(true);
      return validGuess;
    }

    // Already guessed
    const alreadyGuessed = guesses.find((guess) => {
      return guess.name.toLowerCase() === userGuess;
    });
    if (alreadyGuessed) {
      setError(`You already guessed ${guessName}`);
      setErrorColour(seaGreen);
      return;
    }

    // New guess has no diagram (brain or skin)
    if (validGuess.diagrams.length === 0) {
      setError(`${guessName} isn't on our diagrams, but it is a sexual organ!`);
      setErrorColour(warmYellow);
      return validGuess;
    }

    // Correct diagram
    const answerPart = parts.find((guess) => {
      return guess.name === answer.part;
    });
    invariant(answerPart, "Error mapping local storage to parts list");
    const sharedDiagrams = getSharedDiagrams(answerPart, validGuess);
    if (sharedDiagrams.length > 0) {
      setError(`It's not ${guessName}, but this diagram has the part!`);
      setErrorColour(warmYellow);
      return validGuess;
    }

    // Incorrect diagram
    setError(`Not quite! You have ${5 - guesses.length} guesses left.`);
    setErrorColour(errorRed);
    return validGuess;
  }

  // Clicking the final message should take you to the answer diagram
  function revealAnswer() {
    if (gameOver) {
      setHighlight({ name: answer.part, source: "message" });
    }
  }

  return (
    <form onSubmit={addGuess} className="mt-1 z-20">
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
          className="text-center font-bold my-2"
          style={{ cursor: gameOver ? "pointer" : "auto", color: errorColour }}
          onClick={revealAnswer}
        >
          {error}
        </p>
      )}
      {!!win && (
        <p
          className="text-center font-bold my-2"
          style={{ cursor: gameOver ? "pointer" : "auto", color: seaGreen }}
          onClick={revealAnswer}
        >
          {win}
        </p>
      )}
      {!error && !win && <div className="h-[42px]" />}
    </form>
  );
}
