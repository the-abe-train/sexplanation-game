import Twitter from "../images/icons/twitter.svg";
import GitHub from "../images/icons/github.svg";
import Coffee from "../images/icons/coffee.svg";
import Instagram from "../images/icons/instagram.svg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="my-2 mx-3 sm:mx-0 flex flex-col sm:flex-row space-y-2 
    sm:space-y-0 justify-between"
    >
      <div>
        <p>
          Check out{" "}
          <a
            href="https://www.herraproductions.com/a-sexplanation?utm_source=Genital+Wordle+Game&utm_medium=referral&utm_campaign=Genital+Wordle+Game"
            className="underline"
          >
            A Sexplanation: The Movie
          </a>
        </p>
        <p>
          View our{" "}
          <Link to="/privacy" className="underline">
            privacy policy
          </Link>
        </p>
      </div>
      <div className="my-0">
        <p className="space-x-2 mb-2">
          Website by{" "}
          <a href="https://the-abe-train.com" className="underline">
            The Abe Train
          </a>
          <a
            href="https://twitter.com/theAbeTrain"
            aria-label="Twitter"
            className="inline"
          >
            <img
              src={Twitter}
              alt="twitter"
              className="inline"
              width={14}
              height={14}
            />
          </a>
          <a
            className="underline"
            href="https://github.com/the-abe-train/sexplanation-game"
          >
            <img
              src={GitHub}
              alt="github"
              className="inline"
              width={14}
              height={14}
            />
          </a>
          <a
            className="underline"
            href="https://www.buymeacoffee.com/theabetrain"
          >
            <img
              src={Coffee}
              alt="buy me a coffee"
              className="inline"
              width={14}
              height={14}
            />
          </a>
        </p>
        <p className="space-x-2 mb-2">
          Diagrams by{" "}
          <a href="https://kyliemillward.com/" className="underline">
            Kylie Millward
          </a>
          <a
            className="underline"
            href="https://www.instagram.com/kyliemillward/"
          >
            <img
              src={Instagram}
              alt="instagram"
              className="inline"
              width={14}
              height={14}
            />
          </a>
        </p>
      </div>
    </footer>
  );
}
