import highlights from "../images/highlights";
import { BrowserView } from "react-device-detect";
import { Suspense, useEffect, useState } from "react";
import { Part } from "../lib/types";
import diagrams from "../images/diagrams";
import Label from "./Label";
import parts from "../data/parts.json";

type Props = {
  guesses: Part[];
  highlight: string;
  setHighlight: React.Dispatch<React.SetStateAction<string>>;
  gameOver: boolean;
};

type Layer = "Vulva" | "Clitoris" | "Uterus";

type DiagramInfo = {
  name: string;
  sex: "Male" | "Female";
  layer: Layer;
};

const diagramMap: DiagramInfo[] = [
  { name: "vulva", sex: "Female", layer: "Vulva" },
  { name: "clitoris", sex: "Female", layer: "Clitoris" },
  { name: "uterus", sex: "Female", layer: "Uterus" },
];

export default function Diagram({
  guesses,
  highlight,
  setHighlight,
  gameOver,
}: Props) {
  const [sex, setSex] = useState<"Male" | "Female">("Female");
  const [layer, setLayer] = useState<Layer>("Vulva");
  const [diagram, setDiagram] = useState("clitoris");
  const [showLabels, setShowLabels] = useState<string[]>([]);

  function changeDiagram(diagramName: string) {
    if (!gameOver) {
      setDiagram(diagrams[diagramName]);
      setShowLabels(
        guesses
          .filter((guess) => guess.diagram === diagramName)
          .map((guess) => guess.name)
      );
    } else {
      setDiagram(diagrams[diagramName]);
      setShowLabels(
        parts
          .filter((part) => part.diagram === diagramName)
          .map((part) => part.name)
      );
    }
  }

  // When player switches highlight
  useEffect(() => {
    const highlightPart = parts.find((part) => part.name === highlight);
    if (highlightPart) {
      const diagramName = highlightPart.diagram;
      const diagramInfo = diagramMap.find((d) => d.name === diagramName);
      changeDiagram(diagramName);
      if (diagramInfo) {
        setSex(diagramInfo.sex);
        setLayer(diagramInfo.layer);
      }
    }
  }, [highlight]);

  // When player switches diagrams
  useEffect(() => {
    if (layer === "Vulva") {
      changeDiagram("vulva");
    }
    if (layer === "Clitoris") {
      changeDiagram("clitoris");
    }
    if (layer === "Uterus") {
      changeDiagram("uterus");
    }
  }, [layer, sex]);

  const renderLoader = () => <p>Loading...</p>;

  // TODO maybe replace drawn lines on diagram with different PNG so that only
  // plastecine has a shadow
  return (
    <Suspense fallback={renderLoader()}>
      <div className="mb-8 z-0">
        <div
          className="w-[500px] sm:w-[42rem] relative -ml-14
          overflow-clip h-[325px] my-4"
        >
          <img
            src={diagram}
            alt={diagram}
            className="absolute -top-20"
            style={{ filter: "drop-shadow(2px 2px 2px #929292)" }}
          />
          {showLabels.includes(highlight) && (
            <img
              src={highlights[highlight]}
              alt={highlight}
              className="absolute -top-20 z-0 opacity-70 pointer-events-none"
            />
          )}
          <BrowserView>
            {showLabels.length >= 1 &&
              showLabels.map((label, idx) => {
                return (
                  <Label name={label} setHighlight={setHighlight} key={idx} />
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
              onClick={() => setSex("Female")}
              style={{
                fontWeight: sex === "Female" ? "bold" : "",
                color: sex === "Female" ? "#DA9100" : "",
                cursor: "pointer",
              }}
            >
              Female
            </p>
            <p
              onClick={() => setSex("Male")}
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
            <p
              onClick={() => setLayer("Clitoris")}
              style={{
                fontWeight: layer === "Clitoris" ? "bold" : "",
                cursor: "pointer",
              }}
            >
              Clitoris
            </p>
            <p
              onClick={() => setLayer("Vulva")}
              style={{
                fontWeight: layer === "Vulva" ? "bold" : "",
                cursor: "pointer",
              }}
            >
              Vulva
            </p>
            <p
              onClick={() => setLayer("Uterus")}
              style={{
                fontWeight: layer === "Uterus" ? "bold" : "",
                cursor: "pointer",
              }}
            >
              Uterus
            </p>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
