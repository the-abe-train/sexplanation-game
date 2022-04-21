import maleLabels from "../data/male_labels.json";
import femaleLabels from "../data/female_labels.json";
import { Layer } from "../lib/types";

type Props = {
  name: string;
  setHighlight: React.Dispatch<React.SetStateAction<string>>;
  sex: "Male" | "Female";
  layer: Layer;
};

export default function Label({ name, setHighlight, sex, layer }: Props) {
  const labelData = { Male: maleLabels, Female: femaleLabels };
  const label = labelData[sex].find((label) => {
    const correctLayer = "layer" in label ? label.layer === layer : true;
    // if (label.name === "Scrotum") {
    //   console.log("Scrotum label", label);
    //   console.log("Correct layer", correctLayer);
    // }
    return label.name === name && correctLayer;
  });
  // console.log("Label", label);
  if (label) {
    console.log("Label", label);
    // console.log("Layer", layer);
    const { x, y, width, height, path } = label;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 4800 3298"
        className="absolute -top-12 pointer-events-none"
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
          fill="#347873"
          stroke="black"
          strokeWidth="1"
          d={path}
        />
      </svg>
    );
  }
  return <></>;
}
