import Twitter from "../images/icons/twitter.svg";
import GitHub from "../images/icons/github.svg";
import Coffee from "../images/icons/coffee.svg";
import Instagram from "../images/icons/instagram.svg";
import Trainwreck from "../images/icons/trainwreck.svg";
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
        <p className=" mb-2 flex">
          <span>Web app by</span>
          <a href="https://trainwrecklabs.com" data-i18n="Footer1">
            <span className="underline ml-1"> Trainwreck Labs</span>
            <img
              src={Trainwreck}
              width={20}
              height={20}
              className="ml-2 mb-[1px] inline"
              alt="trainwreck"
            />
          </a>
          <a
            href="https://twitter.com/theAbeTrain"
            aria-label="Twitter"
            className="mx-3 inline"
          >
            <img src={Twitter} alt="Twitter" width={20} height={15} />
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
