import { generateAnswer } from "../util/answer";

type Props = {
  answer?: {
    clue: string;
    part: string;
  };
};

export default function Clue({ answer }: Props) {
  const clue = answer?.clue || generateAnswer(false).clue;
  return (
    <p
      className="mx-4 my-[10px] rounded-md py-2 px-4 bg-orange-50 border border-black"
      style={{
        borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
      }}
    >
      {clue}
    </p>
  );
}
