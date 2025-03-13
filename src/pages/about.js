import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/about.module.css';

export default function About() {
  const [visibleFeatures, setVisibleFeatures] = useState([]);

  // Squid Game features
  const features = [
  ];

  useEffect(() => {
    // Animate features appearing one by one
    const timer = setTimeout(() => {
      let count = 0;
      const interval = setInterval(() => {
        if (count < features.length) {
          setVisibleFeatures(prev => [...prev, count]);
          count++;
        } else {
          clearInterval(interval);
        }
      }, 200);
    }, 500);

    // Easter egg for CTF
    console.log("Looking for the flag? Keep searching...");

    // Hidden flag comment - this would be found in source code inspection
    // <!-- flag{hidden_about_page_flag} -->

    // Keyboard sequence detector
    let secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let userInput = [];

    const handleKeyDown = (e) => {
      userInput.push(e.key);
      userInput = userInput.slice(-secretCode.length);

      if (JSON.stringify(userInput) === JSON.stringify(secretCode)) {
        document.body.innerHTML += '<div style="display:none">flag{konami_code_master}</div>';
        alert('You found a secret!');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [features.length]);

  return (
    <div className={styles.container}>
      <Head>
        <title>About | CTF Web Challenge 2025</title>
        <meta name="description" content="About the Squid Game CTF Challenge" />
      </Head>

      <div className={styles.logo}>
        <div className={styles.logoItem}></div>
        <div className={styles.logoItem}></div>
        <div className={styles.logoItem}></div>
      </div>

      <div className={styles.contentContainer}>
        <h1>
          <span className={styles.highlight}>ABOUT</span> THE GAME
        </h1>

        <div className={styles.description}>
          <h3>WEB CHALLENGE 1</h3>
          <h2>
            Prize Pool: ₹15,000</h2>
          <h3>
            You have entered the first Web challenge of this Capture the Flag. A voice echoes:
            Hidden in plain sight, beyond what you see,
            In the events highlights, lies the key.
            Find whats not shown, what whispers within,
            Unveil the flag, let the game begin.
            Look closer — every detail counts. Will you solve the riddle, or be left behind?
          </h3><h2>
            Event Highlights:</h2><h3>
            → Team Name: Ceaser IV</h3><h2></h2><h3>
            → Mode: wtsrwsv lmhiw e tpeciv alswi ryqfiv yrpsgow oic</h3><h2></h2><h3>
            → Format: TECHNIX&#123;?_?&#125;</h3><h2></h2><h3>
            → Challenge Types: Cryptography, Web Exploitation, Reverse Engineering, Forensics, OSINT, and more</h3><h2></h2><h2>
            → Rules:</h2><h3>

            Bring your own laptops and tools
          </h3>
        </div>

        <ul className={styles.featureList}>
          {features.map((feature, index) => (
            <li
              key={index}
              className={`${visibleFeatures.includes(index) ? styles.visible : ''}`}
            >
              {feature}
            </li>
          ))}
        </ul>

        <Link href="/" className={styles.btn}>
          Back to Main
        </Link>
      </div>
    </div>
  );
}