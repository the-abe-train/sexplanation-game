import Button from "./componenets/Button";
import Doodles from "./componenets/Doodles";
import Paper from "./componenets/Paper";

function App() {
  return (
    <div className="container mx-auto max-w-2xl">
      <Paper>
        <p className="mt-line-height">
          How sexually literate are you? Let's find out!
        </p>
        <p className="mt-line-height">
          The purpose of the game is to figure out the secret sexual organ given
          its scientific definition. Every day has one <b>female</b> and one{" "}
          <b>male</b> game. Choose a sex to begin!
        </p>
        <Doodles>
          <div className="flex justify-center space-x-6">
            <Button />
            <button>Female</button> <button>Male</button>
          </div>
        </Doodles>
      </Paper>
    </div>
  );
}

export default App;
