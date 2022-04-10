import data from "../data/labels.json";

type Props = {
  name: string;
  setHighlight: React.Dispatch<React.SetStateAction<string>>;
};

export default function Label({ name, setHighlight }: Props) {
  const labelData = data.find((label) => label.name === name);
  if (labelData) {
    const { x, y, width, height, path } = labelData;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 4800 2700"
        className="absolute -top-20 pointer-events-none"
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
