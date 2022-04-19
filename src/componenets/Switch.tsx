import { useState } from "react";
import styles from "../styles/switch.module.css";

const { switcher, slider } = styles;

export default function Switch() {
  const [on, setOn] = useState(false);
  function toggle() {
    console.log("toggle");
    setOn(!on);
  }
  return (
    <form
      action=""
      className="w-full flex justify-between items-center space-x-4"
    >
      <label htmlFor="hard-mode">Hard mode</label>
      <div className={switcher} onClick={toggle}>
        <input
          name="hard-mode"
          type="checkbox"
          checked={on}
          onChange={(e) => setOn(e.target.checked)}
          className="w-full h-full  "
        />
        <span className={slider}></span>
      </div>
    </form>
  );
}
