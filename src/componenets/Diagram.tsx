import diagram from "../images/Female internal/Diagram.png";
import { labels, highlights } from "../images/Female internal";
import { BrowserView } from "react-device-detect";
import { Suspense, useState } from "react";
import { Part } from "../lib/types";

type Props = {
  guesses: Part[];
  highlight: string;
};

export default function Diagram({ guesses, highlight }: Props) {
  const [female, setFemale] = useState(true);
  const [internal, setInternal] = useState(true);
  const renderLoader = () => <p>Loading</p>;
  return (
    <Suspense fallback={renderLoader()}>
      <div className="mb-8 z-0">
        {" "}
        <div className="relative h-[200px] sm:h-[250px] w-[500px] sm:w-full">
          <img
            src={diagram}
            alt="Female Internal"
            className="absolute top-0 -left-[100px] sm:-left-7 z-0"
            style={{ filter: "drop-shadow(2px 2px 2px #6d6d6d)" }}
          />
          <BrowserView>
            {guesses.length >= 1 &&
              guesses
                .filter(({ name }) => name in labels)
                .map(({ name }) => {
                  return (
                    <img
                      key={name}
                      src={labels[name]}
                      alt={name}
                      className="absolute top-0 -left-7 z-10"
                      style={{ filter: "contrast(20%)" }}
                    />
                  );
                })}
          </BrowserView>
          <img
            src={highlights[highlight]}
            alt={highlight}
            className="absolute top-0 -left-[100px] sm:-left-7 z-0 opacity-80"
          />
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
