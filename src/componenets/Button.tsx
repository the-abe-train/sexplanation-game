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

const { button, buttonSmall, buttonBig, bg, bgInverted, centred } = styles;

export default function Button({
  children,
  colour,
  inverted,
  size,
  disabled = false,
  fn,
}: Props) {
  const sizeClass = {
    small: buttonSmall,
    medium: button,
    big: buttonBig,
  }[size];
  return (
    <button
      className={`${sizeClass} focus:ring-4 z-20`}
      disabled={disabled}
      onClick={fn}
      tabIndex={0}
    >
      <span>{children}</span>
      <div
        className={inverted ? bgInverted : bg}
        style={{ backgroundColor: colour }}
      >
        <span
          className={centred}
          style={{ color: colour === seaGreen ? "white" : "black" }}
        >
          {children}
        </span>
      </div>
    </button>
  );
}
