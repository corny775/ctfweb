import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/level.module.css';

export default function Level2() {
  const [flagRevealed, setFlagRevealed] = useState(false);
  
  const level = {
    id: "2",
    title: "Cookie Monster",
    description: "Websites use cookies to store information. Can you find whats stored?",
    flag: "TECHNIX{c00k13_th13f}",
  };

  useEffect(() => {
    // Set a cookie with the flag
    document.cookie = "secret_data=flag{c00k13_th13f}; path=/";
  }, []);

  // Function to reveal flag for demo purposes
  const handleRevealFlag = () => {
    setFlagRevealed(true);
  };

  return (
    <div className={styles.container} data-level={2}>
      <Head>
        <title>Level {level.id} - {level.title}</title>
        <meta name="description" content={`CTF Challenge Level ${level.id}`} />
      </Head>

      <main className={styles.main}>
        <div className={styles.levelHeader}>
          <h1>WEB CHALLENGE 2</h1>
          <div className={styles.navigationLinks}>
            <Link href="/home" className={styles.homeLink}>Back to Menu</Link>
          </div>
        </div>

        <div className={styles.challenge}>
          <p className={styles.description}>{level.description}</p>
          
          <div className={styles.level2}>
            <div className={styles.image}>
              <Image 
                src="/api/placeholder/300/200" 
                alt="Cookie jar" 
                width={300} 
                height={200} 
              />
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