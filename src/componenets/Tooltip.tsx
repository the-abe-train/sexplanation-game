import helpIcon from "../images/icons/help.svg";
export default function Tooltip() {
  const tooltipText = `ANATOMY≠GENDER

This game uses cisgender male and female anatomy—which means the sex assigned at birth matches one’s gender identity. While it might be the most typical anatomy, it’s completely NORMAL for biology to result in a wide range of different bodies and gender identities.

There are intersex, non-binary, trans bodies—and more. To learn more, visit [link].`;

  return (
    <div className="relative flex flex-col items-center group h-fit">
      <img src={helpIcon} alt="Help Icon" className="w-5 h-5" />
      <div className="absolute bottom-0 flex-col items-center hidden mb-6 group-hover:flex">
        <p
          className="relative z-10 p-2 text-xs text-center 
      text-white whitespace-no-wrap bg-black shadow-lg w-56"
        >
          ANATOMY≠GENDER
        </p>
        <p
          className="relative z-10 p-2 text-xs 
      text-white whitespace-no-wrap bg-black shadow-lg w-56"
        >
          This game uses cisgender male and female anatomy—which means the sex
          assigned at birth matches one’s gender identity. While it might be the
          most typical anatomy, it’s completely NORMAL for biology to result in
          a wide range of different bodies and gender identities.
        </p>
        <p
          className="relative z-10 p-2 text-xs
      text-white whitespace-no-wrap bg-black shadow-lg w-56"
        >
          There are intersex, non-binary, trans bodies—and more.{" "}
          <a href="/" className="underline">
            Learn more.
          </a>
        </p>
        <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
      </div>
    </div>
  );
}
