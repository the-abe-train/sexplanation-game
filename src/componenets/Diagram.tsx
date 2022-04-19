import femaleHighlights from "../images/female_highlights";
import maleHighlights from "../images/male_highlights";
import { BrowserView } from "react-device-detect";
import { Suspense, useEffect, useState } from "react";
import { Layer, Part } from "../lib/types";
import diagrams from "../images/diagrams";
import Label from "./Label";
const parts: Part[] = require("../data/parts.json");

type Props = {
  guesses: Part[];
  highlight: string;
  setHighlight: React.Dispatch<React.SetStateAction<string>>;
  gameOver: boolean;
};

type DiagramInfo = {
  sex: "Male" | "Female";
  layer: Layer;
};

// TODO resolve the empty space

const diagramMap: DiagramInfo[] = [
  { sex: "Female", layer: "Vulva" },
  { sex: "Female", layer: "Clitoris" },
  { sex: "Female", layer: "Uterus" },
  { sex: "Male", layer: "Penis" },
  { sex: "Male", layer: "Internal" },
  { sex: "Male", layer: "Foreskin" },
];

const highlights = { Male: maleHighlights, Female: femaleHighlights };

export default function Diagram({
  guesses,
  highlight,
  setHighlight,
  gameOver,
}: Props) {
  const [sex, setSex] = useState<"Male" | "Female">("Female");
  const [layer, setLayer] = useState<Layer>("Vulva");
  const [diagram, setDiagram] = useState(diagrams["Clitoris"]);
  const [showLabels, setShowLabels] = useState<string[]>([]);

  function getLabels(guesses: Part[], diagramName: Layer) {
    return guesses
      .filter((guess) => guess.diagrams.includes(diagramName))
      .map((guess) => guess.name);
  }

  function changeDiagram(diagramName: Layer) {
    if (!gameOver) {
      setDiagram(diagrams[diagramName]);
      setShowLabels(getLabels(guesses, diagramName));
    } else {
      setDiagram(diagrams[diagramName]);
      setShowLabels(getLabels(parts, diagramName));
    }
  }

  // When player switches highlight
  // Reminder: "Diagram" state is the png string, "Layer" state is the name
  useEffect(() => {
    const highlightPart = parts.find((part) => part.name === highlight);
    if (highlightPart) {
      const needChangeDiagram = !highlightPart.diagrams.includes(layer);
      const diagramName = needChangeDiagram ? highlightPart.diagrams[0] : layer;
      const diagramInfo = diagramMap.find((d) => d.layer === diagramName);
      changeDiagram(diagramName);
      if (diagramInfo) {
        setSex(diagramInfo.sex);
        setLayer(diagramInfo.layer);
      }
    }
  }, [highlight]);

  // When player switches diagrams
  useEffect(() => {
    changeDiagram(layer);
  }, [layer]);

  const renderLoader = () => <p>Loading...</p>;

  // TODO maybe replace drawn lines on diagram with different PNG so that only
  // plastecine has a shadow
  return (
    <Suspense fallback={renderLoader()}>
      <div className="mb-8 z-0">
        <div
          className="w-[500px] sm:w-[42rem] relative -ml-14
          overflow-clip h-[400px]"
        >
          <img
            src={diagram}
            alt={diagram}
            className="absolute -top-12"
            style={{ filter: "drop-shadow(2px 2px 2px #929292)" }}
          />
          {showLabels.includes(highlight) && (
            <img
              src={highlights[sex][highlight]}
              alt={highlight}
              className="absolute -top-12 z-0 opacity-70 pointer-events-none"
            />
          )}
          <BrowserView>
            {showLabels.length >= 1 &&
              showLabels.map((label, idx) => {
                return (
                  <Label
                    sex={sex}
                    name={label}
                    setHighlight={setHighlight}
                    key={idx}
                  />
                );
              })}
          </BrowserView>
        </div>
        <div className="flex w-full justify-around items-center h-[52px] text-sm sm:text-base">
          <div
            className="flex h-fit space-x-4 sm:space-x-8 px-4 sm:px-7 py-2 
        justify-around bg-white border-gray-700 border-[1px]"
            style={{
              borderRadius: "255px 200px 225px 200px/200px 225px 200px 255px",
              boxShadow: "20px 38px 34px -26px hsla(0, 0%, 0%, 0.2)",
            }}
          >
            <p
              onClick={() => {
                setSex("Female");
                setLayer("Vulva");
              }}
              style={{
                fontWeight: sex === "Female" ? "bold" : "",
                color: sex === "Female" ? "#DA9100" : "",
                cursor: "pointer",
              }}
            >
              Female
            </p>
            <p
              onClick={() => {
                setSex("Male");
                setLayer("Penis");
              }}
              style={{
                fontWeight: sex === "Male" ? "bold" : "",
                color: sex === "Male" ? "teal" : "",
                cursor: "pointer",
              }}
            >
              Male
            </p>
          </div>
          <div
            className="flex h-fit space-x-4 sm:space-x-8 px-4 sm:px-7 py-2 
                  justify-around bg-white border-gray-700 border-[1px]"
            style={{
              borderRadius: "255px 200px 225px 200px/200px 225px 200px 255px",
              boxShadow: "20px 38px 34px -26px hsla(0, 0%, 0%, 0.2)",
            }}
          >
            {diagramMap
              .filter((map) => map.sex === sex)
              .map(({ layer: layerName }, idx) => {
                return (
                  <p
                    onClick={() => setLayer(layerName)}
                    style={{
                      fontWeight: layer === layerName ? "bold" : "",
                      cursor: "pointer",
                    }}
                    key={idx}
                  >
                    {layerName}
                  </p>
                );
              })}
          </div>
        </div>
      </div>
    </Suspense>
  );
}
