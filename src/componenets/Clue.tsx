import { answer } from "../util/answer";

export default function Clue() {
  return (
    <p
      className="my-1 mx-4 rounded-md py-2 px-4 bg-orange-50 border-[1px] border-black"
      style={{
        borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
      }}
    >
      {answer.clue}
    </p>
  );
}
