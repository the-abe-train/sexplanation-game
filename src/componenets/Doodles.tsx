import React from "react";
import { ReactComponent as Dicks } from "../images/DICKS.svg";
import data from "../data/doodlePaths.json";

export default function Doodles({ children }: any) {
  return (
    <div className="relative max-w-xl mx-auto my-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-18 -18 460 240"
        version="1.1"
      >
        {data.map((path) => {
          return (
            <path
              style={{
                stroke: "none",
                fillRule: "nonzero",
                fill: "black",
                fillOpacity: 1,
              }}
              d={path}
            />
          );
        })}
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </div>
  );
}
