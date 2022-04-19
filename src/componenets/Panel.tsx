import React from "react";
import { DiagramInfo, Layer } from "../lib/types";

type Props = {
  setSex: React.Dispatch<React.SetStateAction<"Female" | "Male">>;
  setLayer: React.Dispatch<React.SetStateAction<Layer>>;
  sex: "Female" | "Male";
  layer: Layer;
  diagramMap: DiagramInfo[];
};

export default function Panel({
  setSex,
  setLayer,
  sex,
  layer,
  diagramMap,
}: Props) {
  return (
    <div className="flex w-full justify-around items-center h-[52px] text-sm sm:text-base">
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
  );
}
