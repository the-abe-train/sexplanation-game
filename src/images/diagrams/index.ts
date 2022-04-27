import FemaleOutside from "./Vulva.png";
import FemaleInside from "./Clitoris.png";
import Deeper from "./Uterus.png";
import MaleOutside from "./Penis.png";
import MaleInside from "./Internal.png";
import TheTip from "./Foreskin.png";
import MobileTheTip from "./Mobile Foreskin.png";
import { DiagramIndex, Layer } from "../../lib/types";

const diagrams: DiagramIndex<string> = {
  Male: {
    Outside: MaleOutside,
    "The Tip": TheTip,
    "Mobile The Tip": MobileTheTip,
    Inside: MaleInside,
  },
  Female: {
    Deeper,
    Inside: FemaleInside,
    Outside: FemaleOutside,
  },
};

export default diagrams;

// const diagrams: DiagramIndex = {
//   Vulva,
//   Clitoris,
//   Uterus,
//   MaleOutside,
//   Internal,
//   Foreskin,
//   "Mobile Foreskin": MobileForeskin,
// };
