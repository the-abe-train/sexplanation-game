import maleLabels from "../data/male_labels.json";
import femaleLabels from "../data/female_labels.json";

type Props = {
  name: string;
  setHighlight: React.Dispatch<React.SetStateAction<string>>;
  sex: "Male" | "Female";
};
// TODO labia majora, for example, needs to have a higer z-index.
export default function Label({ name, setHighlight, sex }: Props) {
  const labelData = { Male: maleLabels, Female: femaleLabels };
  const label = labelData[sex].find((label) => label.name === name);
  if (label) {
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
        ></rect>
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
