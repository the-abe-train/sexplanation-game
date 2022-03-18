import styles from "../styles/paper.module.css";

export default function Paper({ header, children }: any) {
  console.log(styles.paper);
  return (
    <div className={styles.paper}>
      <div className={styles.pattern}>
        <header className={styles.header}>{header}</header>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
