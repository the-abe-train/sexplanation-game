import { useContext } from "react";
import { ModeContext } from "../context/ModeContext";
import styles from "../styles/switch.module.css";

const { switcher, slider } = styles;

export default function Switch() {
  // Context
  const { mode, setMode } = useContext(ModeContext);
  console.log(mode);

  function toggleHardMode() {
    if (setMode) {
      setMode({ hardMode: !mode.hardMode });
    }
  }

  return (
    <form
      action=""
      className="w-full flex justify-between items-center space-x-4"
    >
      <label htmlFor="hard-mode">Hard mode</label>
      <div className={switcher} onClick={toggleHardMode}>
        <input
          name="hard-mode"
          type="checkbox"
          checked={mode.hardMode}
          className="w-full h-full"
          onChange={() => console.log("Switch toggled")}
        />
        <span className={slider}></span>
      </div>
    </form>
  );
}
