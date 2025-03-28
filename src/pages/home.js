import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 11,
    minutes: 0,
    seconds: 48,
    milliseconds: 39
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

  const levels = [
    {
      id: "2",
      title: "Cookie Carveout",
      description: "Discover secrets stored in cookies"
    },
    {
      id: "3",
      title: "Flag in Haystack",
      description: "Learn to find hidden content in HTML"
    },
    {
      id: "4",
      title: "Tri-Clue Gambit",
      description: "Find messages hidden in developer console"
    },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>TECHNIX 2025 - Web Hacking CTF Challenges</title>
        <meta name="description" content="Learn web security through hands-on challenges" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.backgroundOverlay}></div>

      <header className={styles.header}>
        <div className={styles.logo}>
        <Link href="/"><div className={styles.circle}></div></Link>
        <Link href="/"><div className={styles.triangle}></div></Link>
        <Link href="/"><div className={styles.square}></div></Link>
        </div>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/about" >About</Link>
          <Link href="/level/piclead">Sponsor</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.titleContainer}>
          <h1 className={styles.titleTop}>
            C<span className={styles.highlightPink}>T</span>F
          </h1>
          <h1 className={styles.titleBottom}>2025</h1>
        </div>


        <h2 className={styles.subTitle}>Web CHALLENGE</h2>
        
        <p className={styles.description}>
          Learn web security concepts through hands-on challenges. 
          Each level teaches you a different technique for finding hidden information.
        </p>
        
        <div className={styles.grid}>
          {levels.map((level) => (
            <Link href={`/level/${level.id}`} key={level.id} className={styles.card}>
              <div className={styles.levelBadge}>{level.id}</div>
              <h3>{level.title}</h3>
            </Link>
          ))}
        </div>

        <div className={styles.instructions}>
          <h2>How to Play</h2>
          <ol>
            <li><Link href="/level/level1">inspect element</Link></li>
            <li><Link href="/level/level5">Network Detective</Link></li>
            <li><Link href="/level/level7">Source Mapper</Link></li>
          </ol>
        </div>
      </main>

      <div className={styles.muteButton}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
        </svg>
      </div>
    </div>
  );
}