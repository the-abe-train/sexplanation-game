import highlights from "../images/highlights";
import { BrowserView } from "react-device-detect";
import { Suspense, useEffect, useState } from "react";
import { Part } from "../lib/types";
import diagrams from "../images/diagrams";
import Label from "./Label";

type Props = {
  guesses: Part[];
  highlight: string;
  setHighlight: React.Dispatch<React.SetStateAction<string>>;
};

export default function Diagram({ guesses, highlight, setHighlight }: Props) {
  const [female, setFemale] = useState(true);
  const [internal, setInternal] = useState(true);
  const [diagram, setDiagram] = useState("clitoris");
  const [showLabels, setShowLabels] = useState<string[]>([]);

  useEffect(() => {
    setHighlight("");
    if (internal) {
      setDiagram(diagrams["vulva"]);
      setShowLabels(
        guesses
          .filter((guess) => guess.diagram === "vulva")
          .map((guess) => guess.name)
      );
    }
    if (!internal) {
      setDiagram(diagrams["clitoris"]);
      setShowLabels(
        guesses
          .filter((guess) => guess.diagram === "clitoris")
          .map((guess) => guess.name)
      );
    }
  }, [internal, female]);

  const renderLoader = () => <p>Loading</p>;

  return (
    <Suspense fallback={renderLoader()}>
      <div className="mb-8 z-0">
        <div
          className="w-[500px] sm:w-[42rem] relative -ml-14
          overflow-clip h-[300px] my-4"
        >
          <img src={diagram} alt="" className="absolute -top-20" />
          <img
            src={highlights[highlight]}
            alt={highlight}
            className="absolute -top-20 z-0 opacity-80 pointer-events-none"
          />
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
              onClick={() => setFemale(true)}
              style={{
                fontWeight: female ? "bold" : "",
                color: female ? "#DA9100" : "",
                cursor: "pointer",
              }}
            >
              Female
            </p>
            <p
              onClick={() => setFemale(false)}
              style={{
                fontWeight: female ? "" : "bold",
                color: female ? "" : "teal",
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
              onClick={() => setInternal(true)}
              style={{
                fontWeight: internal ? "bold" : "",
                cursor: "pointer",
              }}
            >
              Internal
            </p>
            <p
              onClick={() => setInternal(false)}
              style={{
                fontWeight: internal ? "" : "bold",
                cursor: "pointer",
              }}
            >
              External
            </p>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
