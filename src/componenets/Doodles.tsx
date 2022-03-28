import { useEffect, useState } from "react";
import data from "../data/doodles_categorized.json";
import useInterval from "../hooks/useInterval";
import styles from "../styles/transition.module.css";

// TODO revisit drawing the doodles instead of fading

export default function Doodles({ children }: any) {
  const [doodles, setDoodles] = useState<string[]>([]);
  const [count, setCount] = useState(1);

  useInterval(() => setCount(count + 1), 2000);

  useEffect(() => {
    const paths = data.map((p) => p.path);
    setDoodles(paths.slice(0, count));
  }, [count]);

  return (
    <div className="relative max-w-xl mx-auto my-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-18 -18 460 240"
        version="1.1"
      >
        {doodles.map((path, idx) => {
          return <path d={path} key={idx} className={styles.fade} />;
        })}
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </div>
  );
}
