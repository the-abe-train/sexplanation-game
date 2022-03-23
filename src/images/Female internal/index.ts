import cervixLabel from "./Cervix label.png";
import cervixHighlight from "./Cervix highlight.png";
import fallopianLabel from "./Fallopian tube label.png";
import fallopianHighlight from "./Fallopian tube highlight.png";
import labiaMinoraLabel from "./Labia minora label.png";
import labiaMinoraHighlight from "./Labia minora highlight.png";
import ovaryLabel from "./Ovary label.png";
import ovaryHighlight from "./Ovary highlight.png";
import uterineLiningLabel from "./Uterine lining label.png";
import uterineLiningHighlight from "./Uterine lining highlight.png";
import uterasLabel from "./Uterus label.png";
import uterasHighlight from "./Uterus highlight.png";
import vaginaLabel from "./Vagina label.png";
import vaginaHighlight from "./Vagina highlight.png";

type PictureIndex = { [key: string]: string };

export const labels: PictureIndex = {
  Cervix: cervixLabel,
  "Fallopian tubes": fallopianLabel,
  "Labia minora": labiaMinoraLabel,
  Ovary: ovaryLabel,
  "Uterine lining": uterineLiningLabel,
  Uterus: uterasLabel,
  Vagina: vaginaLabel,
};

export const highlights: PictureIndex = {
  Cervix: cervixHighlight,
  "Fallopian tubes": fallopianHighlight,
  "Labia minora": labiaMinoraHighlight,
  Ovary: ovaryHighlight,
  "Uterine lining": uterineLiningHighlight,
  Uterus: uterasHighlight,
  Vagina: vaginaHighlight,
};
