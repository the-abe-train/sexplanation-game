import React from "react";
import styles from "../styles/paper.module.css";
import Header from "./Header";

export default function Paper({ children }: any) {
  return (
    <div id="paper" className={styles.paper}>
      <div id="pattern" className={styles.pattern}>
        <header className={styles.header}>
          <Header />
        </header>
        <div id="content" className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}
