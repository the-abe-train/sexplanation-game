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
      className="my-1 mx-4 rounded-md py-2 px-4 bg-orange-50 border-[1px] border-black"
      style={{
        borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
      }}
    >
      {clue}
    </p>
  );
}
