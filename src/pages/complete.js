import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Complete.module.css';

export default function Complete() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Challenge Complete!</title>
        <meta name="description" content="You&apos;ve completed the CTF challenge" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Congratulations!
        </h1>
        
        <div className={styles.fireworks}></div>
        
        <p className={styles.description}>
          You&apos;ve successfully completed all 8 levels of the WebHack CTF Challenge!
        </p>

        <div className={styles.stats}>
          <h2>Your Achievements:</h2>
          <ul>
            <li>Discovered hidden HTML elements</li>
            <li>Found secrets in cookies</li>
            <li>Used the browser console</li>
            <li>Examined local storage</li>
            <li>Intercepted network requests</li>
            <li>Decoded encrypted messages</li>
            <li>Explored source maps</li>
            <li>Combined multiple techniques</li>
          </ul>
        </div>

        <div className={styles.finalFlag}>
          <p>Final Achievement Unlocked:</p>
          <h3>flag{m4st3r_0f_w3b_s3cur1ty}</h3>
        </div>
        
        <Link href="/" className={styles.homeButton}>
          Return to Home
        </Link>
      </main>

      <footer className={styles.footer}>
        <p>Thanks for playing!</p>
      </footer>
    </div>
  );
}