import React from "react";

export default function Footer() {
  return (
    <footer className="m-4">
      <p>
        From the creators of{" "}
        <a className="underline" href="/">
          Globle
        </a>{" "}
        and{" "}
        <a href="/" className="underline">
          A Sexplanation
        </a>
        .
      </p>
      <p>
        View the{" "}
        <a href="/" className="underline">
          privacy policy
        </a>{" "}
        or the{" "}
        <a href="/" className="underline">
          open-source code
        </a>
        .
      </p>
    </footer>
  );
}
