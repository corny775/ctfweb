import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/level.module.css';

export default function Level4() {
  const [flagRevealed, setFlagRevealed] = useState(false);
  
  const level = {
    id: "4",
    title: "Local Storage",
    description: "Modern web apps store data locally. Can you find what&apos;s hidden?",
    flag: "flag{l0c4l_st0r4g3_h4ck3r}",
  };

  useEffect(() => {
    // Store in localStorage
    localStorage.setItem("user_config", JSON.stringify({
      theme: "dark",
      language: "en",
      secret: "flag{l0c4l_st0r4g3_h4ck3r}"
    }));
  }, []);

  // Function to reveal flag for demo purposes
  const handleRevealFlag = () => {
    setFlagRevealed(true);
  };

  return (
    <div className={styles.container} data-level={4}>
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
          
          <div className={styles.level4}>
            <p>This app stores user preferences locally. Find the secret in localStorage.</p>
            <div className={styles.preferences}>
              <button className={styles.themeButton}>Toggle Theme</button>
              <button className={styles.langButton}>Change Language</button>
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