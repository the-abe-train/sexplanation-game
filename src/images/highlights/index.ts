import MaleOutside from "./penis";
import TheTip from "./foreskin";
import MaleInside from "./internal";
import Deeper from "./uterus";
import FemaleOutside from "./vulva";
import FemaleInside from "./clitoris";
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
