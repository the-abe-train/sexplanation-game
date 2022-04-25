import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../componenets/Button";
import Clue from "../componenets/Clue";
import Doodles from "../componenets/Doodles";
import styles from "../styles/transition.module.css";

export default function Intro() {
  const [reveal, setReveal] = useState(false);
  return (
    <main className="mt-line-height">
      <section>
        <p className="text-red-700 text-center">
          WARNING: This game depicts human sexual anatomy... but in a fun,
          educational way!
        </p>
        {!reveal && (
          <div className="mx-auto block w-fit my-8">
            <Button
              colour="#FFC8FF"
              size="medium"
              inverted={false}
              fn={() => setReveal(true)}
            >
              Reveal game
            </Button>
          </div>
        )}
      </section>
      {reveal && (
        <section className={styles.fade}>
          <p className="mt-line-height">
            How <b className="text-[#C50D6F]">sexually literate</b> are you?
            Let's find out!
          </p>
          <p className="mt-line-height">
            Try to guess the secret sexual organ based on a clue.{" "}
            <b className="text-[#C50D6F]">You get 6 tries</b>, but we'll tell
            you if you're close!
          </p>
          <p className="mt-line-height">Ready to play? Today's clue: </p>
          <Clue />
          <Doodles>
            <div className="flex justify-center space-x-6 mt-2">
              <Link to="/game">
                <Button
                  children="Play!"
                  colour="#FFC8FF"
                  inverted={false}
                  size="medium"
                />
              </Link>
            </div>
          </Doodles>
        </section>
      )}
    </main>
  );
}
