import styles from "../styles/paper.module.css";
import { ReactComponent as Home } from "../images/icons/home.svg";
import { ReactComponent as Stats } from "../images/icons/stats.svg";
import { Link, useSearchParams } from "react-router-dom";
import { ReactNode } from "react";
import { isDesktop } from "react-device-detect";

export default function Paper({ children }: { children: ReactNode }) {
  const [params] = useSearchParams();
  const practiceMode = !!params.get("practice_mode");
  const title = isDesktop ? (
    <>
      GENITLE: An <i>A Sexplanation</i> Game
    </>
  ) : (
    <>GENITLE</>
  );
  return (
    <div className={styles.paper}>
      <div className={styles.pattern}>
        <header className={styles.header}>
          <Link to="/" data-testid="home-icon" aria-label="Home">
            <Home className="mb-2 h-4" />
          </Link>
          <Link to={practiceMode ? "/" : "/game"}>
            <h1 className="text-center text-2xl underline">{title}</h1>
          </Link>
          <Link to="stats" data-testid="stats-icon" aria-label="Stats">
            <Stats className="mb-2 h-4" />
          </Link>
        </header>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
