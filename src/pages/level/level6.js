import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/level.module.css';

export default function Level6() {
  const [flagRevealed, setFlagRevealed] = useState(false);
  
  const level = {
    id: "6",
    title: "Cipher Decoder",
    description: "This message is encoded. Can you crack the code?",
    flag: "flag{d3c0d3r_r1ng}",
  };

  useEffect(() => {
    // Base64 encode the flag
    const encodedFlag = btoa("The flag is: flag{d3c0d3r_r1ng}");
    setTimeout(() => {
      const messageElement = document.getElementById('encoded-message');
      if (messageElement) {
        messageElement.textContent = encodedFlag;
      }
    }, 100);
  }, []);

  // Function to reveal flag for demo purposes
  const handleRevealFlag = () => {
    setFlagRevealed(true);
  };

  return (
    <div className={styles.container} data-level={6}>
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
          
          <div className={styles.level6}>
            <p>Decode this message to find the flag:</p>
            <pre id="encoded-message" className={styles.encodedMessage}></pre>
            <p className={styles.hint}>Hint: This is a common encoding used on the web.</p>
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