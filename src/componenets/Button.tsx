import styles from "../styles/button.module.css";
import { seaGreen } from "../util/colours";

type Props = {
  children: string;
  colour: string;
  inverted: boolean;
  size: "small" | "medium" | "big";
  disabled?: boolean;
  fn?: () => void;
};

const { button, small, medium, big } = styles;

export default function Button({
  children,
  colour,
  size,
  disabled = false,
  fn,
}: Props) {
  const sizeClass = {
    small,
    medium,
    big,
  }[size];

  return (
    <button
      className={`${button} ${sizeClass} focus:ring-4 z-20`}
      disabled={disabled}
      onClick={fn}
      tabIndex={0}
      style={{ backgroundColor: colour }}
    >
      <span
        className="overflow-hidden"
        style={{ color: colour === seaGreen ? "white" : "black" }}
      >
        {children}
      </span>
    </button>
  );
}
