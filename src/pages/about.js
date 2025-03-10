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
  }, []);
  
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
          <h3>LEVEL 2</h3>
<h2>
Prize Pool: ₹15,000</h2>
<h3>
Think youve got what it takes to crack codes and uncover hidden secrets? Red Flag, Green Flag is the ultimate Capture The Flag (CTF) competition where your cybersecurity skills will be put to the test! From cryptography, web security, reverse engineering, forensics, OSINT, and more — get ready to exploit vulnerabilities, decode challenges, and hunt for flags, all while avoiding those red flags.
</h3><h2>
Event Highlights:</h2><h3>
→ Team Size: BASE 64</h3><h2></h2><h3>
→ Mode: VGhlIGZsYWcgaXM6IGZsYWd7ZDNjMGQzcl9yMW5nfQ==</h3><h2></h2><h3>
→ Format: Jeopardy-style CTF with challenges of varying difficulty</h3><h2></h2><h3>
→ Challenge Types: Cryptography, Web Exploitation, Reverse Engineering, Forensics, OSINT, and more</h3><h2></h2><h2>
→ Rules:</h2><h3>

Bring your own laptops and tools

Unauthorized system compromise = Disqualification

Follow all event guidelines for a fair play

Online tools allowed, but no external help/public sharing — violation leads to disqualification
→ Hints available (but come with point deductions)
→ Winner: Team with the highest score (ties broken by time)


Whether youre a seasoned hacker or a budding enthusiast, Red Flag, Green Flag is where you prove your mettle and capture glory!

Limited to 12 teams — so register fast!
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