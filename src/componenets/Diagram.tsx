import highlights from "../images/highlights";
import diagrams from "../images/diagrams";
import outlines from "../images/outlines";
import { BrowserView, isMobile } from "react-device-detect";
import { useEffect, useState } from "react";
import { DiagramInfo, Layer, Part } from "../lib/types";
import Label from "./Label";
import styles from "../styles/diagram.module.css";
import Panel from "./Panel";
import { after } from "underscore";
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

export default function Diagram({
  guesses,
  highlight,
  setHighlight,
  gameOver,
}: Props) {
  const [sex, setSex] = useState<"Male" | "Female">("Female");
  const [layer, setLayer] = useState<Layer>("Vulva");
  const [layerPng, setLayerPng] = useState(diagrams["Clitoris"]);
  const [outlinePng, setOutlinePng] = useState(outlines["Clitoris"]);
  const [showLabels, setShowLabels] = useState<string[]>([]);
  const [highlightPng, setHighlightPng] = useState("");

  function getLabels(guesses: Part[], diagramName: Layer) {
    return guesses
      .filter((guess) => guess.diagrams.includes(diagramName))
      .map((guess) => guess.name);
  }

  function changeDiagram(diagramName: Layer) {
    const chooseDiagram =
      isMobile && diagramName === "Foreskin" ? "Mobile Foreskin" : diagramName;
    setLayerPng(diagrams[chooseDiagram]);
    setOutlinePng(outlines[chooseDiagram]);
    if (!gameOver) {
      setShowLabels(getLabels(guesses, diagramName));
    } else {
      setShowLabels(getLabels(parts, diagramName));
    }
  }

  // When player switches highlight
  useEffect(() => {
    // Change diagram
    const highlightPart = parts.find((part) => part.name === highlight);
    if (highlightPart) {
      const needChangeDiagram = !highlightPart.diagrams.includes(layer);
      const diagramName = needChangeDiagram ? highlightPart.diagrams[0] : layer;
      const diagramInfo = diagramMap.find((d) => d.layer === diagramName);
      changeDiagram(diagramName);
      if (diagramInfo) {
        setSex(diagramInfo.sex);
        setLayer(diagramInfo.layer);
        const allLayerHighlights =
          highlights[diagramInfo.sex][diagramInfo.layer];
        if (allLayerHighlights) {
          setHighlightPng(allLayerHighlights[highlight]);
        }
      }
    }
  }, [highlight]);

  // When player switches diagrams
  useEffect(() => {
    changeDiagram(layer);
    console.log(`Sex: ${sex}, layer: ${layer}`);
    const allLayerHighlights = highlights[sex][layer];
    if (allLayerHighlights) {
      setHighlightPng(allLayerHighlights[highlight]);
    }
  }, [layer]);

  const renderLoader = () => <p>Loading...</p>;

  // When the game ends
  useEffect(() => {
    if (gameOver) {
      setShowLabels(getLabels(parts, layer));
    }
  }, [gameOver]);

  // TODO Add treasure hunt to the game in the guesser dialogue

  // Loading image states
  const [loadedOutline, setLoadedOutline] = useState(true);
  const [loadedLayer, setLoadedLayer] = useState(true);
  const [loadedHighlight, setLoadedHighlight] = useState(true);
  const [loadedLabels, setLoadedLabels] = useState(false);
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    if (!outlinePng) setLoadedOutline(true);
    if (!highlightPng) setLoadedHighlight(true);
    setShowImages(loadedLayer && loadedOutline && loadedHighlight);
  }, [loadedLayer, loadedOutline, loadedHighlight, outlinePng, highlightPng]);

  const onComplete = after(showLabels.length, () => {
    setLoadedLabels(true);
    console.log("loaded labels");
  });

  return (
    <div>
      <div className={styles.container}>
        {showImages && (
          <div className={styles.diagram}>
            {outlinePng && (
              <img
                src={outlinePng}
                alt={layer}
                onLoad={() => setLoadedOutline(true)}
                onLoadStart={() => setLoadedOutline(false)}
                className="absolute -top-12"
              />
            )}
            <img
              src={layerPng}
              alt={layer}
              className="absolute -top-12"
              onLoad={() => setLoadedLayer(true)}
              onLoadStart={() => setLoadedLayer(false)}
              style={{ filter: "drop-shadow(2px 2px 2px #929292)" }}
            />
            {showLabels.includes(highlight) && (
              <img
                src={highlightPng}
                alt={highlight}
                onLoad={() => setLoadedHighlight(true)}
                onLoadStart={() => setLoadedHighlight(false)}
                className="absolute -top-12 z-0 opacity-70 pointer-events-none"
              />
            )}
            <BrowserView>
              {showLabels.length >= 1 &&
                showLabels.map((label, idx) => {
                  return (
                    <Label
                      key={idx}
                      sex={sex}
                      name={label}
                      setHighlight={setHighlight}
                      layer={layer}
                      fn={onComplete}
                    />
                  );
                })}
            </BrowserView>
          </div>
        )}
      </div>
      <Panel
        setSex={setSex}
        setLayer={setLayer}
        sex={sex}
        layer={layer}
        diagramMap={diagramMap}
      />
    </div>
  );
}
