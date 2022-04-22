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
    return label.name === name && correctLayer;
  });
  function test() {
    console.log("loaded");
  }
  if (label) {
    const { x, y, width, height, path } = label;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 4800 3298"
        className="absolute -top-12 pointer-events-none"
        onClick={() => setHighlight(name)}
        // @ts-ignore
        // onLoadStart={test}
        // onLoad={() => {
        //   console.log(name, "loaded");
        //   // fn();
        // }}
        // onLoad={console.log("Loaded", name)}
      >
        <rect
          className="cursor-pointer"
          x={x}
          y={y}
          width={width}
          height={height}
          fill="none"
          pointerEvents="visible"
          onLoadStart={test}
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
