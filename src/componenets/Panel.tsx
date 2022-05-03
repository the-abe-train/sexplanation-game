import React from "react";
import { DiagramInfo, Layer } from "../lib/types";
import { orange, teal } from "../util/colours";
import Tooltip from "./Tooltip";

type Props = {
  setSex: React.Dispatch<React.SetStateAction<"Female" | "Male">>;
  setLayer: React.Dispatch<React.SetStateAction<Layer>>;
  sex: "Female" | "Male";
  layer: Layer;
  diagramMap: DiagramInfo[];
  setError: React.Dispatch<React.SetStateAction<string>>;
  error: string;
};

export default function Panel({
  setSex,
  setLayer,
  sex,
  layer,
  diagramMap,
  setError,
}: Props) {
  return (
    <div className="flex w-full justify-around items-end sm:items-center h-[52px] text-sm sm:text-base">
      <div className="flex flex-col sm:flex-row items-center space-x-3">
        <div className="flex space-x-1 items-center">
          <p>Cis</p>
          <Tooltip />
        </div>
        <div
          className="flex h-fit space-x-3 sm:space-x-8 px-4 sm:px-7 py-2 
        justify-around bg-white border-gray-700 border-[1px]"
          style={{
            borderRadius: "255px 200px 225px 200px/200px 225px 200px 255px",
            boxShadow: "20px 38px 34px -26px hsla(0, 0%, 0%, 0.2)",
          }}
        >
          <p
            onClick={() => {
              setSex("Female");
              setLayer("Outside");
              setError("");
            }}
            style={{
              fontWeight: sex === "Female" ? "bold" : "",
              color: sex === "Female" ? orange : "",
              cursor: "pointer",
            }}
          >
            Female
          </p>
          <p
            onClick={() => {
              setSex("Male");
              setLayer("Outside");
              setError("");
            }}
            style={{
              fontWeight: sex === "Male" ? "bold" : "",
              color: sex === "Male" ? teal : "",
              cursor: "pointer",
            }}
          >
            Male
          </p>
        </div>
      </div>
      <div
        className="flex h-fit space-x-3 sm:space-x-8 px-4 sm:px-7 py-2 
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
                onClick={() => {
                  setLayer(layerName);
                  setError("");
                }}
                style={{
                  fontWeight: layer === layerName ? "bold" : "",
                  color:
                    layer === layerName && sex === "Male"
                      ? teal
                      : layer === layerName && sex === "Female"
                      ? orange
                      : "",
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
  );
}
