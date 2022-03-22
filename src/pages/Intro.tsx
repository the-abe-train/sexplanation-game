import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../componenets/Button";
import Doodles from "../componenets/Doodles";
import styles from "../styles/transition.module.css";
import { answer } from "../util/answer";

export default function Intro() {
  const [reveal, setReveal] = useState(false);
  return (
    <main className="mt-line-height">
      <section>
        <p className="text-red-700 text-center">
          WARNING: This game containes images depicting human sexual anatomy...
          but in a fun, educational way!
        </p>
        {!reveal && (
          <div className="mx-auto block w-fit my-8">
            <Button
              colour="pink"
              size="large"
              text="Reveal game"
              inverted={false}
              fn={() => setReveal(true)}
            />
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
            The purpose of the game is to figure out the secret sexual organ
            based on a clue. <b className="text-[#C50D6F]">You get 6 tries.</b>{" "}
            Ready to play?
          </p>
          <p className="mt-line-height">
            Today's clue: <b>{answer.clue}</b>
          </p>
          <Doodles>
            <div className="flex justify-center space-x-6 mt-2">
              <Link to="/game">
                <Button
                  text={"Play!"}
                  colour={"#ccccff"}
                  inverted={false}
                  size="large"
                />
              </Link>
            </div>
          </Doodles>
        </section>
      )}
    </main>
  );
}
