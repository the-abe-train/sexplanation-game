import FemaleOutside from "./Female Outside.png";
import FemaleInside from "./Female Inside.png";
import Deeper from "./Deeper.png";
import MaleOutside from "./Male Outside.png";
import MaleInside from "./Male Inside.png";
import TheTip from "./The Tip.png";
import MobileTheTip from "./Mobile The Tip.png";
import { DiagramIndex } from "../../lib/types";

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
