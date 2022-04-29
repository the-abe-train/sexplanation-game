import styles from "../styles/paper.module.css";
import { ReactComponent as Home } from "../images/icons/home.svg";
import { ReactComponent as Stats } from "../images/icons/stats.svg";
import { Link } from "react-router-dom";

// TODO clicking on header during practice mode should properly exit practice mode
export default function Paper({ children }: any) {
  return (
    <div className={styles.paper}>
      <div className={styles.pattern}>
        <header className={styles.header}>
          <Link to="/" data-testid="home-icon">
            <Home className="mb-2 h-4" />
          </Link>
          {/* <div className="flex flex-col"> */}
          <Link to="/game">
            <h1 className="text-center text-lg sm:text-2xl underline">
              Genitle: An <i>A Sexplanation</i> Game
            </h1>
          </Link>
          {/* <h2 className="text-center text-md sm:text-md underline">
              An <i>A Sexplanation</i> Game
            </h2> */}
          {/* </div> */}
          <Link to="stats" data-testid="stats-icon">
            <Stats className="mb-2 h-4" />
          </Link>
        </header>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
