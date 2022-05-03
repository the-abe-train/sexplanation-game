import MaleOutside from "./MaleOutside";
import TheTip from "./TheTip";
import MaleInside from "./MaleInside";
import Deeper from "./Deeper";
import FemaleOutside from "./FemaleOutside";
import FemaleInside from "./FemaleInside";
import { DiagramIndex, PictureIndex } from "../../lib/types";

const highlights: DiagramIndex<PictureIndex> = {
  Male: {
    Outside: MaleOutside,
    "The Tip": TheTip,
    Inside: MaleInside,
  },
  Female: {
    Deeper,
    Inside: FemaleInside,
    Outside: FemaleOutside,
  },
};

export default highlights;
