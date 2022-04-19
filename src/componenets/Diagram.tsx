import femaleHighlights from "../images/female_highlights";
import maleHighlights from "../images/male_highlights";
import { BrowserView } from "react-device-detect";
import { Suspense, useEffect, useState } from "react";
import { DiagramInfo, Layer, Part } from "../lib/types";
import diagrams from "../images/diagrams";
import Label from "./Label";
import styles from "../styles/diagram.module.css";
import Panel from "./Panel";
const parts: Part[] = require("../data/parts.json");

type Props = {
  guesses: Part[];
  highlight: string;
  setHighlight: React.Dispatch<React.SetStateAction<string>>;
  gameOver: boolean;
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

  // TODO replace drawn lines on diagram with different PNG so that only
  // plastecine has a shadow

  // TODO include parts for the same sex on multiple diagrams
  // TODO Add treasure hunt to the game in the guesser dialogue
  return (
    <Suspense fallback={renderLoader()}>
      <div className={styles.container}>
        <div className={styles.diagram}>
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
      </div>
      <Panel
        setSex={setSex}
        setLayer={setLayer}
        sex={sex}
        layer={layer}
        diagramMap={diagramMap}
      />
    </Suspense>
  );
}
