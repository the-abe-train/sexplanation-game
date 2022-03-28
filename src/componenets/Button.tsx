import styles from "../styles/button.module.css";

type Props = {
  children: string;
  colour: string;
  inverted: boolean;
  size: "small" | "large";
  disabled?: boolean;
  fn?: () => void;
};

const { button, buttonSmall, bg, bgInverted, centred, disabled } = styles;

export default function Button({
  children,
  colour,
  inverted,
  size,
  disabled = false,
  fn,
}: Props) {
  return (
    <button
      className={size === "small" ? buttonSmall : button}
      disabled={disabled}
      onClick={fn}
    >
      <span>{children}</span>
      <div
        className={inverted ? bgInverted : bg}
        style={{ backgroundColor: colour }}
      >
        <span className={centred}>{children}</span>
      </div>
    </button>
  );
}
