import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '@/styles/level.module.css';

// Import the CookieGame component
import CookieGame from '@/components/CookieGame';

// Import all level components
import Level1 from './level1';
import Level2 from './level2';
import Level3 from './level3';
import Level4 from './level4';
import Level5 from './level5';
import Level6 from './level6';
import Level7 from './level7';
import Level8 from './level8';

// Define the levels and their flags
const levels = {
  "1": {
    title: "Inspect Element",
    description: "Sometimes what you see isn&apos;t everything there is.",
    flag: "flag{hidden_in_plain_sight}",
    component: Level1
  },
  "2": {
    title: "Cookie Monster",
    description: "Websites use cookies to store information. Can you find what&apos;s stored?",
    flag: "flag{c00k13_th13f}",
    component: Level2
  },
  "3": {
    title: "JavaScript Console",
    description: "Developers leave messages in the console. Check what&apos;s there.",
    flag: "flag{c0ns0l3_m4st3r}",
    component: Level3
  },
  "4": {
    title: "Local Storage",
    description: "Modern web apps store data locally. Can you find what&apos;s hidden?",
    flag: "flag{l0c4l_st0r4g3_h4ck3r}",
    component: Level4
  },
  "5": {
    title: "Network Detective",
    description: "What&apos;s being sent in the background? Check the network tab.",
    flag: "flag{n3tw0rk_sn1ff3r}",
    component: Level5
  },
  "6": {
    title: "Cipher Decoder",
    description: "This message is encoded. Can you crack the code?",
    flag: "flag{d3c0d3r_r1ng}",
    component: Level6
  },
  "7": {
    title: "Source Mapper",
    description: "Check the source maps to find what&apos;s hidden in the original code.",
    flag: "flag{s0urc3_m4pp3r}",
    component: Level7
  },
  "8": {
    title: "Final Challenge",
    description: "Put all your skills together for the final challenge.",
    flag: "flag{w3b_h4ck3r_pr0}",
    component: Level8
  }
};

export default function Level() {
  const router = useRouter();
  const { id } = router.query;
  const [level, setLevel] = useState(null);
  const [showCookieGame, setShowCookieGame] = useState(false);
  const [cookieChallengeCompleted, setCookieChallengeCompleted] = useState(false);

  useEffect(() => {
    if (id && levels[id]) {
      // For level 2, check if the cookie challenge has been completed
      if (id === "2") {
        const hasCompletedChallenge = checkCookieChallenge();
        setCookieChallengeCompleted(hasCompletedChallenge);
        
        // Show cookie game for level 2 if not completed
        if (!hasCompletedChallenge) {
          setShowCookieGame(true);
        }
      } else {
        setShowCookieGame(false);
      }
      
      setLevel(levels[id]);
    }
  }, [id]);

  // Check if cookie challenge has been completed
  const checkCookieChallenge = () => {
    if (typeof window !== 'undefined') {
      const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('cookie_challenge='))
        ?.split('=')[1];
      
      return cookieValue === 'flag{c00k13_th13f}';
    }
    return false;
  };

  // Handle cookie game completion
  const handleCookieGameSuccess = () => {
    // Set the cookie for the challenge
    document.cookie = "cookie_challenge=flag{c00k13_th13f}; path=/";
    setCookieChallengeCompleted(true);
    setShowCookieGame(false);
  };

  if (!level) return <div className={styles.loading}>Loading level...</div>;

  // If it's level 2 and cookie challenge not completed, show cookie game
  if (id === "2" && showCookieGame && !cookieChallengeCompleted) {
    return (
      <div className={styles.levelContainer}>
        <Head>
          <title>{`Level ${id}: ${level.title}`}</title>
        </Head>
        <header className={styles.levelHeader}>
          <h1>Level {id}: {level.title}</h1>
          <p>{level.description}</p>
        </header>
        <CookieGame onSuccess={handleCookieGameSuccess} />
      </div>
    );
  }

  // Render the specific level component
  const LevelComponent = level.component;
  return <LevelComponent />;
}