import styles from "../styles/button.module.css";

type Props = {
  children: string;
  colour: string;
  inverted: boolean;
  size: "small" | "medium" | "big";
  disabled?: boolean;
  fn?: () => void;
};

const { button, buttonSmall, buttonBig, bg, bgInverted, centred, disabled } =
  styles;

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
      className={`${sizeClass} focus:ring-8 z-20`}
      disabled={disabled}
      onClick={fn}
      tabIndex={0}
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
