import styles from "../styles/paper.module.css";
import { ReactComponent as Home } from "../images/icons/home.svg";
import { ReactComponent as Stats } from "../images/icons/stats.svg";
import { Link } from "react-router-dom";

export default function Paper({ children }: any) {
  return (
    <div className={styles.paper}>
      <div className={styles.pattern}>
        <header className={styles.header}>
          <Link to="/">
            <Home className="mb-2 h-4" />
          </Link>
          <h1 className="text-center text-3xl underline">
            A Sexplanation: The Game
          </h1>
          <Stats className="mb-2 h-4" />
        </header>
        <div className={styles.content}>{children}</div>
        <footer className={styles.footer}>
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
      </div>
    </div>
  );
}
