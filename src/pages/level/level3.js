import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/level.module.css';

export default function Level3() {
  const [flagRevealed, setFlagRevealed] = useState(false);
  
  const level = {
    id: "3",
    title: "JavaScript Console",
    description: "Developers leave messages in the console. Check what&apos;s there.",
    flag: "flag{c0ns0l3_m4st3r}",
  };

  useEffect(() => {
    // Console log the flag
    setTimeout(() => {
      console.log("Debug info: User accessing level 3");
      console.log("System check: OK");
      console.log("Flag verification: flag{c0ns0l3_m4st3r}");
    }, 1000);
  }, []);

  // Function to reveal flag for demo purposes
  const handleRevealFlag = () => {
    setFlagRevealed(true);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Level {level.id} - {level.title}</title>
        <meta name="description" content={`CTF Challenge Level ${level.id}`} />
      </Head>

      <main className={styles.main}>
        <div className={styles.levelHeader}>
          <h1>Level {level.id}: {level.title}</h1>
          <div className={styles.navigationLinks}>
            <Link href="/home" className={styles.homeLink}>Back to Menu</Link>
          </div>
        </div>

        <div className={styles.challenge}>
          <p className={styles.description}>{level.description}</p>
          
          <div className={styles.level3}>
            <p>Open your browser&apos;s developer console (F12) and check for messages.</p>
            <button 
              className={styles.actionButton}
              onClick={() => console.log("Hint: Keep watching the console output...")}
            >
              Run System Check
            </button>
          </div>

          {flagRevealed && (
            <div className={styles.flagContainer}>
              <h3>You found the flag!</h3>
              <div className={styles.flag}>{level.flag}</div>
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Web Hacking CTF Challenge</p>
      </footer>
    </div>
  );
}