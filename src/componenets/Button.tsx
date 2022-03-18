import styles from "../styles/button.module.css";

type Props = {
  text: string;
  colour: string;
  inverted: boolean;
};

const { button, bg, bgInverted, centred } = styles;

export default function Button({ text, colour, inverted }: Props) {
  return (
    <button className={button}>
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
