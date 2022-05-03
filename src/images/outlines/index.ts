import FemaleOutside from "./Female Outside.png";
import MaleOutside from "./Male Outside.png";
import MaleInside from "./Male Inside.png";
import { DiagramIndex } from "../../lib/types";

const diagrams: DiagramIndex<string> = {
  Male: {
    Outside: MaleOutside,
    Inside: MaleInside,
  },
  Female: {
    Outside: FemaleOutside,
  },
};

export default diagrams;
