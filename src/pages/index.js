import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.milliseconds > 0) {
          return { ...prev, milliseconds: prev.milliseconds - 1 };
        } else if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1, milliseconds: 99 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59, milliseconds: 99 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59, milliseconds: 99 };
        }
        return prev;
      });
    }, 10);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>CTF 2025 - Web Security CTF Challenge</title>
        <meta name="description" content="Test your web security skills in our Squid Game inspired CTF" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.backgroundOverlay}></div>

      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.circle}></div>
          <div className={styles.triangle}></div>
          <div className={styles.square}></div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.titleContainer}>
          <h1 className={styles.titleTop}>
            C<span className={styles.highlightPink}>T</span>F
          </h1>
          <h3 className={styles.titleBottom}>WEB CHALLENGE</h3>
          <h1 className={styles.titleBottom}>2025</h1>
        </div>

       {/* <div className={styles.countdown}>
          <div className={styles.timer}>
            {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}:{String(timeLeft.milliseconds).toString().padStart(2, '0')}
          </div>
        </div>

        <p className={styles.comingSoon}> SOON...</p>*/}

        <div className={styles.challengeInfo}>
          <h2>CTF Challenge Rules:</h2>
          <ul>
            <li>Find the hidden flag on each level</li>
            <li>Each flag has the format: flag&#123;something_here&#125;</li>
            <li>Use browser dev tools and your security knowledge</li>
            <li>No automated scanning tools allowed</li>
          </ul>
          
          <Link href="/home" className={styles.startButton}>
            Start Challenge
          </Link>
        </div>
        
        {/* Hidden flag in HTML comment for those who check source code */}
        {/* Congratulations on finding the bonus flag! flag{source_code_sleuth} */}
      </main>

      <div className={styles.muteButton}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
        </svg>
      </div>
    </div>
  );
}