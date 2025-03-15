import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/level.module.css';

export default function Level7() {
  const [flagRevealed, setFlagRevealed] = useState(false);
  
  const level = {
    id: "7",
    title: "Console Mapper",
    description: "Check the console to find whats hidden in the original code.",
    flag: "man",
  };

  useEffect(() => {
    // This would be in actual implementation through webpack source map
    // For now, we'll inject a global variable through a script tag
    const script = document.createElement('script');
    script.innerHTML = `
      // This would normally be minified and source mapped
      window.__DEBUG_DATA = {
        appVersion: "1.0.4",
        secretFlag: "man",
        environment: "development"
      };
    `;
    document.head.appendChild(script);
  }, []);

  // Function to reveal flag for demo purposes
  const handleRevealFlag = () => {
    setFlagRevealed(true);
  };

  return (
    <div className={styles.container} data-level={7}>
      <Head>
        <title>Level {level.id} - {level.title}</title>
        <meta name="description" content={`CTF Challenge Level ${level.id}`} />
      </Head>

      <main className={styles.main}>
        <div className={styles.levelHeader}>
          <h1>CLUE 3: {level.title}</h1>
          <div className={styles.navigationLinks}>
            <Link href="/home" className={styles.homeLink}>Back to Menu</Link>
          </div>
        </div>

        <div className={styles.challenge}>
          <p className={styles.description}>{level.description}</p>
          
          <div className={styles.level7}>
            <div className={styles.debugInfo}>
              <p>window.__DEBUG_DATA: <span className={styles.status}>Typing</span></p>
              <p>Error Count: <span className={styles.count}>0</span></p>
            </div>
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