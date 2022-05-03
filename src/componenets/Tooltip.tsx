import { useEffect, useRef, useState } from "react";
import helpIcon from "../images/icons/help.svg";

export default function Tooltip() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null!);
  function useOutsideAlerter(ref: React.MutableRefObject<HTMLDivElement>) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(wrapperRef);
  return (
    <div
      className="relative flex flex-col items-center group h-fit self-start mb-4"
      onBlur={() => setOpen(false)}
      ref={wrapperRef}
      onClick={(e) => console.log(e.target)}
    >
      <img
        src={helpIcon}
        alt="Help Icon"
        className="w-5 h-5"
        onClick={() => setOpen(!open)}
      />
      <div
        className={`absolute bottom-0 flex-col items-center w-52 bg-black ${
          open ? "flex" : "hidden"
        } mb-6 group-hover:flex`}
      >
        <p
          className="relative z-10 p-2 text-xs text-center 
      text-white whitespace-no-wrap "
        >
          ANATOMY≠GENDER
        </p>
        <p
          className="relative z-10 p-2 text-xs 
      text-white whitespace-no-wrap "
        >
          This game uses cisgender male and female anatomy—which means the sex
          assigned at birth matches one’s gender identity. While it might be the
          most typical anatomy, it’s completely NORMAL for biology to result in
          a wide range of different bodies and gender identities.
        </p>
        <p
          className="relative z-10 p-2 text-xs
      text-white whitespace-no-wrap "
        >
          There are intersex, non-binary, trans bodies—and more.{" "}
          <a
            href="https://www.plannedparenthood.org/learn/gender-identity/sex-gender-identity"
            className="underline"
          >
            Learn more.
          </a>
        </p>
        <div className="w-3 h-3 -mt-2 rotate-45  bg-black"></div>
      </div>
    </div>
  );
}
