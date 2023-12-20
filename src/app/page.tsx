import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.container}>
      <Link href={"/stopWatch"}>
        <button className={styles.select}>stopWatch</button>
      </Link>
      <Link href={"/two"}>
        <button className={styles.select}>two</button>
      </Link>
      <Link href={"/three"}>
        <button className={styles.select}>three</button>
      </Link>
    </main>
  );
}
