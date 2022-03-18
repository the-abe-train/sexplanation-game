import Button from "./componenets/Button";
import Doodles from "./componenets/Doodles";
import Paper from "./componenets/Paper";
import data from "./data/doodles_categorized.json";

function App() {
  return (
    <div className="container mx-auto max-w-2xl">
      <Paper
        header={
          <h1 className="text-center text-3xl underline">
            A Sexplanation: The Game
          </h1>
        }
      >
        <main className="mt-line-height">
          <p className="text-red-700 text-center">
            WARNING: This game containes images depicting human sexual
            anatomy... but in a fun, educational way!
          </p>
          <p className="mt-line-height">
            How <b className="text-[#C50D6F]">sexually literate</b> are you?
            Let's find out!
          </p>
          <p className="mt-line-height">
            The purpose of the game is to figure out the secret sexual organ
            given its scientific definition. Every day has one{" "}
            <b className="text-[#A44804]">female</b> and one{" "}
            <b className="text-[#2E2E9E]">male</b> game.
          </p>
          <p className="mt-line-height">Choose a sex to begin!</p>
          <Doodles>
            <div className="flex justify-center space-x-6 mt-2">
              <Button text={"Male"} colour={"#ccccff"} inverted={false} />
              <Button text={"Female"} colour={"#FFB177"} inverted={true} />
            </div>
          </Doodles>
        </main>
        <footer className="flex flex-col justify-between w-full text-sm leading-line-height">
          <p>
            From the creators of{" "}
            <a className="underline" href="/">
              Globle
            </a>{" "}
            and{" "}
            <a href="/" className="underline">
              A Sexplanation
            </a>
            .
          </p>
          <p>
            View the{" "}
            <a href="/" className="underline">
              privacy policy
            </a>{" "}
            or the{" "}
            <a href="/" className="underline">
              open-source code
            </a>
            .
          </p>
        </footer>
      </Paper>
    </div>
  );
}

export default App;
