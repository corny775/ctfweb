// pages/piclead.js
import Head from 'next/head';
import styles from '@/styles/pic.module.css';

export default function SquidGameProfile() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Squid Game Profile</title>
        <meta name="description" content="Squid Game styled profile page" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.profileContainer}>
            <img 
              src="/piclead.jpg" 
              alt="Profile Picture" 
              className={styles.profilePic}
            />
            <h2 className={styles.playerName}>CTF COORDINATOR</h2>
            <span className={styles.playerName}>
              The Capture The Flag (CTF) Coordinator is basically the wizard behind the curtain, pulling all the strings and praying nothing breaks (or explodes) on game day. They spend weeks herding cats — also known as challenge setters — making sure theres a good mix of mind-bending puzzles that will make participants cry, laugh, and question their life choices. From setting up servers that hopefully wont crash when everyone logs in at once, to testing flags that should be hard to find but not impossible, they do it all — and if something goes wrong, guess whos getting spammed on Discord at 3 a.m.? Yup, the coordinator. Basically, theyre like a party planner, tech support, and evil mastermind all rolled into one.
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}