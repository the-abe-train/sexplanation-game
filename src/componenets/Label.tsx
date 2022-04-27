import maleLabels from "../data/male_labels.json";
import femaleLabels from "../data/female_labels.json";
import { Layer } from "../lib/types";
import { HIGH, LOW } from "../util/contstants";
import { seaGreen, labelGray } from "../util/colours";

type Props = {
  name: string;
  setHighlight: React.Dispatch<React.SetStateAction<string>>;
  sex: "Male" | "Female";
  layer: Layer;
  expanded: boolean;
  gameOver: boolean;
  answer: {
    clue: string;
    part: string;
  };
};

// TODO ask Kylie to add Bulbourethral gland to the Internal diagram
// TODO ask Kylie to rename the Skene's gland to the Paraurethral glands

export default function Label({
  name,
  setHighlight,
  sex,
  layer,
  expanded,
  gameOver,
  answer,
}: Props) {
  const labelData = { Male: maleLabels, Female: femaleLabels };
  const label = labelData[sex].find((label) => {
    const correctLayer = "layer" in label ? label.layer === layer : true;
    return label.name === name && correctLayer;
  });

  const colour = gameOver && answer.part === name ? seaGreen : labelGray;

  if (label) {
    const { x, y, width, height, path } = label;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 4800 3298"
        className="absolute pointer-events-none"
        style={{ top: expanded ? HIGH : LOW }}
        onClick={() => setHighlight(name)}
      >
        <rect
          className="cursor-pointer"
          x={x}
          y={y}
          width={width}
          height={height}
          fill="none"
          pointerEvents="visible"
        />
        <path
          className="cursor-pointer"
          fill={colour}
          stroke={labelGray}
          strokeWidth="1"
          d={path}
        />
      </svg>
    );
  }
  return <></>;
}
