import styles from "../styles/button.module.css";

type Props = {
  text: string;
  colour: string;
  inverted: boolean;
  size: "small" | "large";
  disabled?: boolean;
};

const { button, buttonSmall, bg, bgInverted, centred, disabled } = styles;

export default function Button({
  text,
  colour,
  inverted,
  size,
  disabled = false,
}: Props) {
  return (
    <button
      className={size === "small" ? buttonSmall : button}
      disabled={disabled}
    >
      <span>{text}</span>
      <div
        className={inverted ? bgInverted : bg}
        style={{ backgroundColor: colour }}
      >
        <span className={centred}>{text}</span>
      </div>
    </button>
  );
}
