import highlights from "../images/highlights";
import diagrams from "../images/diagrams";
import outlines from "../images/outlines";
import { BrowserView, isDesktop, isMobile } from "react-device-detect";
import { useEffect, useState } from "react";
import { DiagramInfo, Layer, Part, Sex } from "../lib/types";
import Label from "./Label";
import styles from "../styles/diagram.module.css";
import Panel from "./Panel";
import { HIGH, LOW, SHORT, TALL } from "../util/contstants";
import { parts } from "../data/parts";
import {
  bestMatchDiagram,
  getMatchingLabels,
  getSharedDiagrams,
  partOnDiagram,
} from "../util/maps";

type Props = {
  guesses: Part[];
  highlight: string;
  setHighlight: React.Dispatch<React.SetStateAction<string>>;
  gameOver: boolean;
  setError: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  answer: {
    clue: string;
    part: string;
  };
  layer: Layer;
  setLayer: React.Dispatch<React.SetStateAction<Layer>>;
  sex: "Male" | "Female";
  setSex: React.Dispatch<React.SetStateAction<"Male" | "Female">>;
};

const diagramMap: DiagramInfo[] = [
  { sex: "Female", layer: "Outside" },
  { sex: "Female", layer: "Inside" },
  { sex: "Female", layer: "Deeper" },
  { sex: "Male", layer: "The Tip" },
  { sex: "Male", layer: "Outside" },
  { sex: "Male", layer: "Inside" },
];

export default function Diagram({
  guesses,
  highlight,
  setHighlight,
  gameOver,
  answer,
  setError,
  error,
  layer,
  setLayer,
  sex,
  setSex,
}: Props) {
  const [layerPng, setLayerPng] = useState(diagrams["Female"]["Outside"]);
  const [outlinePng, setOutlinePng] = useState(outlines["Female"]["Outside"]);
  const [showLabels, setShowLabels] = useState<string[]>([]);
  const [highlightPng, setHighlightPng] = useState("");

  function otherSex(sex: Sex) {
    return sex === "Male" ? "Female" : "Male";
  }

  function changeDiagram(newDiagram: DiagramInfo) {
    const chooseDiagram: DiagramInfo =
      isMobile && newDiagram.layer === "The Tip"
        ? { sex: "Male", layer: "Mobile The Tip" }
        : newDiagram;
    let { sex: chooseSex, layer: chooseLayer } = chooseDiagram;
    setLayerPng(diagrams[chooseSex][chooseLayer]);
    setOutlinePng(outlines[chooseSex][chooseLayer]);
    if (!gameOver) {
      setShowLabels(getMatchingLabels(guesses, chooseDiagram));
    } else {
      setShowLabels(getMatchingLabels(parts, chooseDiagram));
    }
    return chooseDiagram;
  }

  // When player switches highlight
  useEffect(() => {
    // Change diagram
    const highlightPart = parts.find((part) => part.name === highlight);
    const answerPart = parts.find((part) => part.name === answer.part);
    const currentDiagram = { sex, layer };
    if (highlightPart && answerPart) {
      // Empty variable that will be the diagram we must change to
      let newDiagram: DiagramInfo | null = null;

      // If the part is on the current diagram, don't change it
      if (partOnDiagram(highlightPart, currentDiagram)) {
        newDiagram = currentDiagram;
      }

      // If the answer and the guess share a diagram, that should be the
      // diagram that it's changed to.
      const sharedDiagrams = getSharedDiagrams(answerPart, highlightPart);
      if (sharedDiagrams.length > 0 && !newDiagram) {
        newDiagram = bestMatchDiagram(sharedDiagrams, currentDiagram);
      }

      // Otherwise, if the part is not on the current diagram, change it
      if (!newDiagram) {
        newDiagram = bestMatchDiagram(highlightPart.diagrams, currentDiagram);
      }

      const diagramInfo = changeDiagram(newDiagram);
      setSex(diagramInfo.sex);
      setLayer(diagramInfo.layer);
      const allLayerHighlights = highlights[diagramInfo.sex][diagramInfo.layer];
      if (allLayerHighlights) {
        setHighlightPng(allLayerHighlights[highlight]);
      }
    }
  }, [highlight]);

  // When player switches diagrams
  useEffect(() => {
    changeDiagram({ sex, layer });
    const allLayerHighlights = highlights[sex][layer];
    if (allLayerHighlights) {
      setHighlightPng(allLayerHighlights[highlight]);
    }
  }, [sex, layer]);

  // When the game ends
  useEffect(() => {
    if (gameOver) {
      setShowLabels(getMatchingLabels(parts, { sex, layer }));
    }
  }, [gameOver]);

  // Loading images
  const [loadedOutline, setLoadedOutline] = useState(true);
  const [loadedLayer, setLoadedLayer] = useState(true);
  const [loadedHighlight, setLoadedHighlight] = useState(true);
  const [showImages, setShowImages] = useState(false);
  useEffect(() => {
    if (!outlinePng) setLoadedOutline(true);
    if (!highlightPng) setLoadedHighlight(true);
    setShowImages(loadedLayer && loadedOutline && loadedHighlight);
  }, [loadedLayer, loadedOutline, loadedHighlight, outlinePng, highlightPng]);

  // Minimizing empty space
  const outlierLabels = ["Vulva", "Perineum", "Sperm", "Efferent ducts"];
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const outliersExist = showLabels.some((showLabel) => {
      return outlierLabels.includes(showLabel);
    });
    if (outliersExist && isDesktop) setExpanded(true);
  }, [showLabels]);

  // Label props
  const labelProps = { sex, layer, setHighlight, expanded, gameOver, answer };

  // Panel props
  const panelProps = {
    setSex,
    setLayer,
    sex,
    layer,
    diagramMap,
    setError,
    error,
  };

  return (
    <div>
      <div
        className={styles.container}
        style={{ height: expanded ? TALL : SHORT }}
      >
        {showImages && (
          <div
            className={`${styles.diagram}`}
            style={{ height: expanded ? TALL : SHORT }}
          >
            {outlinePng && (
              <img
                src={outlinePng}
                alt={layer}
                onLoad={() => setLoadedOutline(true)}
                onLoadStart={() => setLoadedOutline(false)}
                className="absolute"
                style={{ top: expanded ? HIGH : LOW }}
              />
            )}
            <img
              src={layerPng}
              alt={layer}
              className="absolute"
              onLoad={() => setLoadedLayer(true)}
              onLoadStart={() => setLoadedLayer(false)}
              style={{
                filter: "drop-shadow(2px 2px 2px #929292)",
                top: expanded ? HIGH : LOW,
              }}
            />
            {showLabels.includes(highlight) && (
              <img
                src={highlightPng}
                alt={highlight}
                onLoad={() => setLoadedHighlight(true)}
                onLoadStart={() => setLoadedHighlight(false)}
                className="absolute z-0 opacity-70 pointer-events-none"
                style={{ top: expanded ? HIGH : LOW }}
              />
            )}
            <BrowserView>
              {showLabels.length >= 1 &&
                showLabels.map((label, idx) => {
                  return <Label key={idx} name={label} {...labelProps} />;
                })}
            </BrowserView>
          </div>
        )}
      </div>
      <Panel {...panelProps} />
    </div>
  );
}
