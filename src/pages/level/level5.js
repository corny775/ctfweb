import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/level.module.css';

export default function Level5() {
  const [flagRevealed, setFlagRevealed] = useState(false);
  
  const level = {
    id: "5",
    title: "Network Detective",
    description: "Whats being sent in the background? Check the network tab.",
    flag: "char",
  };

  useEffect(() => {
    // Make a fetch request with the flag
    setTimeout(() => {
      fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CLUE-2': 'char'
        },
        body: JSON.stringify({ event: 'level_view', level: level.id })
      }).catch(() => {
        // This will 404 but the headers can be seen in network tab
        console.log('Analytics event sent');
      });
    }, 2000);
  }, [level.id]);

  // Function to reveal flag for demo purposes
  const handleRevealFlag = () => {
    setFlagRevealed(true);
  };

  return (
    <div className={styles.container} data-level={5}>
      <Head>
        <title>Level {level.id} - {level.title}</title>
        <meta name="description" content={`CTF Challenge Level ${level.id}`} />
      </Head>

      <main className={styles.main}>
        <div className={styles.levelHeader}>
          <h1>CLUE 2: {level.title}</h1>
          <div className={styles.navigationLinks}>
            <Link href="/home" className={styles.homeLink}>Back to Menu</Link>
          </div>
        </div>

        <div className={styles.challenge}>
          <p className={styles.description}>{level.description}</p>
          
          <div className={styles.level5}>
            <div className={styles.activityLog}>
              <p>User analytics being monitored...</p>
              <div className={styles.spinner}></div>
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