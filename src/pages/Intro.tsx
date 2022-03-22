import { Link } from "react-router-dom";
import Button from "../componenets/Button";
import Doodles from "../componenets/Doodles";

export default function Intro() {
  return (
    <main className="mt-line-height">
      <p className="text-red-700 text-center">
        WARNING: This game containes images depicting human sexual anatomy...
        but in a fun, educational way!
      </p>
      <p className="mt-line-height">
        How <b className="text-[#C50D6F]">sexually literate</b> are you? Let's
        find out!
      </p>
      <p className="mt-line-height">
        The purpose of the game is to figure out the secret sexual organ given
        its scientific definition. Every day has one{" "}
        <b className="text-[#A44804]">female</b> and one{" "}
        <b className="text-[#2E2E9E]">male</b> game.
      </p>
      <Doodles>
        <div className="flex justify-center space-x-6 mt-2">
          <Link to="/game">
            <Button
              text={"Play"}
              colour={"#ccccff"}
              inverted={false}
              size="large"
            />
          </Link>
        </div>
      </Doodles>
    </main>
  );
}
