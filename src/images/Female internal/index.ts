import cervix from "./Cervix label.png";
import fallopian from "./Fallopian tube label.png";
import labiaMinora from "./Labia minora label.png";
import ovary from "./Ovary label.png";
import uterineLining from "./Uterine lining label.png";
import uteras from "./Uterus label.png";
import vagina from "./Vagina label.png";

type PictureIndex = { [key: string]: string };

const pictures: PictureIndex = {
  Cervix: cervix,
  "Fallopian tubes": fallopian,
  "Labia minora": labiaMinora,
  Ovary: ovary,
  "Uterine Lining": uterineLining,
  Uterus: uteras,
  Vagina: vagina,
};

export default pictures;
