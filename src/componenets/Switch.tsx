import styles from "../styles/switch.module.css";

const { switcher, slider } = styles;

type Props = {
  on: boolean;
  setOn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Switch({ on, setOn }: Props) {
  return (
    <form
      action=""
      className="w-full flex justify-between items-center space-x-4"
    >
      <label htmlFor="hard-mode">Hard mode</label>
      <div className={switcher} onClick={() => setOn(!on)}>
        <input
          name="hard-mode"
          type="checkbox"
          checked={on}
          onChange={(e) => setOn(e.target.checked)}
          className="w-full h-full"
        />
        <span className={slider}></span>
      </div>
    </form>
  );
}
