import FemaleOutside from "./Vulva.png";
// import Clitoris from "./Clitoris.png";
// import Uterus from "./Uterus.png";
import MaleOutside from "./Penis.png";
import MaleInside from "./Internal.png";
import { DiagramIndex } from "../../lib/types";
// import Foreskin from "./Foreskin Closer.png";

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
