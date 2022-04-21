import Penis from "./penis";
import Foreskin from "./foreskin";
import Internal from "./internal";
import Uterus from "./uterus";
import Vulva from "./vulva";
import Clitoris from "./clitoris";
import { Layer, PictureIndex, Sex } from "../../lib/types";

// The hardest TS I have ever written lol
type Highlight = {
  [key in Sex]: {
    [key in Layer]?: PictureIndex;
  };
};

let x: Highlight;

const highlights: Highlight = {
  Male: {
    Penis,
    Foreskin,
    Internal,
  },
  Female: {
    Uterus,
    Vulva,
    Clitoris,
  },
};

export default highlights;
