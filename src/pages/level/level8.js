import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/level.module.css';

export default function Level8() {
  const [flagRevealed, setFlagRevealed] = useState(false);
  
  const level = {
    id: "8",
    title: "Final Challenge",
    description: "How to play? Count to 1_2_3",
    flag: "flag{w3b_h4ck3r_pr0}",
  };

  useEffect(() => {
    // Multiple techniques combined
    // 1. Set a CSS variable with partial flag
    document.documentElement.style.setProperty('--secret-part-one', 'w3b_h4ck3r');
    
    // 2. Add a script with the second part
    const finalScript = document.createElement('script');
    finalScript.innerHTML = `
      function checkFinalAnswer() {
        return "pr0";
      }
    `;
    document.head.appendChild(finalScript);
    
    // 3. Add a hidden DOM attribute
    setTimeout(() => {
      const mainElement = document.querySelector('main');
      if (mainElement) {
        mainElement.setAttribute('data-flag-format', 'flag{PART1_PART2}');
      }
    }, 100);
  }, []);

  // Function to reveal flag for demo purposes
  const handleRevealFlag = () => {
    setFlagRevealed(true);
  };

  return (
    <div className={styles.container} data-level={8}>
      <Head>
        <title>Level {level.id} - {level.title}</title>
        <meta name="description" content={`CTF Challenge Level ${level.id}`} />
      </Head>

      <main className={styles.main}>
        <div className={styles.levelHeader}>
          <h1>WEB CHALLENGE 4</h1>
          <div className={styles.navigationLinks}>
            <Link href="/home" className={styles.homeLink}>Back to Menu</Link>
          </div>
        </div>

        <div className={styles.challenge}>
          <p className={styles.description}>{level.description}</p>
          
          <div className={styles.level8}>
            <ol>
              <li>Find part 1 of the flag in a CSS variable</li>
              <li>Find part 2 in a JavaScript function</li>
              <li>Find the format in a hidden attribute</li>
            </ol>
            <div className={styles.finalHint}>
              Remember about web inspection.
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