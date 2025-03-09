import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '@/styles/Level.module.css';

// Define the levels and their flags
const levels = {
  "1": {
    title: "Inspect Element",
    description: "Sometimes what you see isn't everything there is.",
    flag: "flag{hidden_in_plain_sight}",
  },
  "2": {
    title: "Cookie Monster",
    description: "Websites use cookies to store information. Can you find what's stored?",
    flag: "flag{c00k13_th13f}",
  },
  "3": {
    title: "JavaScript Console",
    description: "Developers leave messages in the console. Check what's there.",
    flag: "flag{c0ns0l3_m4st3r}",
  },
  "4": {
    title: "Local Storage",
    description: "Modern web apps store data locally. Can you find what's hidden?",
    flag: "flag{l0c4l_st0r4g3_h4ck3r}",
  },
  "5": {
    title: "Network Detective",
    description: "What's being sent in the background? Check the network tab.",
    flag: "flag{n3tw0rk_sn1ff3r}",
  },
  "6": {
    title: "Cipher Decoder",
    description: "This message is encoded. Can you crack the code?",
    flag: "flag{d3c0d3r_r1ng}",
  },
  "7": {
    title: "Source Mapper",
    description: "Check the source maps to find what's hidden in the original code.",
    flag: "flag{s0urc3_m4pp3r}",
  },
  "8": {
    title: "Final Challenge",
    description: "Put all your skills together for the final challenge.",
    flag: "flag{w3b_h4ck3r_pr0}",
  }
};

export default function Level() {
  const router = useRouter();
  const { id } = router.query;
  const [level, setLevel] = useState(null);
  const [flagRevealed, setFlagRevealed] = useState(false);

  useEffect(() => {
    if (id && levels[id]) {
      setLevel(levels[id]);
      setFlagRevealed(false);
      
      // Level-specific logic
      switch(id) {
        case "1":
          // Hidden in HTML
          break;
        case "2":
          // Set a cookie with the flag
          document.cookie = "secret_data=flag{c00k13_th13f}; path=/";
          break;
        case "3":
          // Console log the flag
          setTimeout(() => {
            console.log("Debug info: User accessing level 3");
            console.log("System check: OK");
            console.log("Flag verification: flag{c0ns0l3_m4st3r}");
          }, 1000);
          break;
        case "4":
          // Store in localStorage
          localStorage.setItem("user_config", JSON.stringify({
            theme: "dark",
            language: "en",
            secret: "flag{l0c4l_st0r4g3_h4ck3r}"
          }));
          break;
        case "5":
          // Make a fetch request with the flag
          setTimeout(() => {
            fetch('/api/analytics', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Secret-Flag': 'flag{n3tw0rk_sn1ff3r}'
              },
              body: JSON.stringify({ event: 'level_view', level: id })
            }).catch(() => {
              // This will 404 but the headers can be seen in network tab
              console.log('Analytics event sent');
            });
          }, 2000);
          break;
        case "6":
          // Base64 encode the flag
          const encodedFlag = btoa("The flag is: flag{d3c0d3r_r1ng}");
          setTimeout(() => {
            document.getElementById('encoded-message').textContent = encodedFlag;
          }, 100);
          break;
        case "7":
          // This would be in actual implementation through webpack source map
          // For now, we'll inject a global variable through a script tag
          const script = document.createElement('script');
          script.innerHTML = `
            // This would normally be minified and source mapped
            window.__DEBUG_DATA = {
              appVersion: "1.0.4",
              secretFlag: "flag{s0urc3_m4pp3r}",
              environment: "development"
            };
          `;
          document.head.appendChild(script);
          break;
        case "8":
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
          break;
      }
    }
  }, [id]);

  // Function to reveal flag for demo purposes
  // In a real CTF, this would be triggered by the actual challenge completion
  const handleRevealFlag = () => {
    setFlagRevealed(true);
  };

  if (!level) return <div className={styles.loading}>Loading level...</div>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Level {id} - {level.title}</title>
        <meta name="description" content={`CTF Challenge Level ${id}`} />
      </Head>

      <main className={styles.main}>
        <div className={styles.levelHeader}>
          <h1>Level {id}: {level.title}</h1>
          <div className={styles.navigationLinks}>
            <Link href="/home" className={styles.homeLink}>Back to Menu</Link>
          </div>
        </div>

        <div className={styles.challenge}>
          <p className={styles.description}>{level.description}</p>
          
          {/* Level-specific content */}
          {id === "1" && (
            <div className={styles.level1}>
              <p>Look carefully at this page. The flag is hidden somewhere.</p>
              <div className={styles.hiddenContainer}>
                <span style={{ display: 'none' }}>{"flag{hidden_in_plain_sight}"}</span>
              </div>
            </div>
          )}
          
          {id === "2" && (
            <div className={styles.level2}>
              <p>This website stores a cookie when you visit. Can you find what's inside?</p>
              <img src="/api/placeholder/300/200" alt="Cookie jar" className={styles.image} />
            </div>
          )}
          
          {id === "3" && (
            <div className={styles.level3}>
              <p>Open your browser's developer console (F12) and check for messages.</p>
              <button 
                className={styles.actionButton}
                onClick={() => console.log("Hint: Keep watching the console output...")}
              >
                Run System Check
              </button>
            </div>
          )}
          
          {id === "4" && (
            <div className={styles.level4}>
              <p>This app stores user preferences locally. Find the secret in localStorage.</p>
              <div className={styles.preferences}>
                <button className={styles.themeButton}>Toggle Theme</button>
                <button className={styles.langButton}>Change Language</button>
              </div>
            </div>
          )}
          
          {id === "5" && (
            <div className={styles.level5}>
              <p>This page is sending analytics data in the background. Can you intercept it?</p>
              <div className={styles.activityLog}>
                <p>User activity being monitored...</p>
                <div className={styles.spinner}></div>
              </div>
            </div>
          )}
          
          {id === "6" && (
            <div className={styles.level6}>
              <p>Decode this message to find the flag:</p>
              <pre id="encoded-message" className={styles.encodedMessage}></pre>
              <p className={styles.hint}>Hint: This is a common encoding used on the web.</p>
            </div>
          )}
          
          {id === "7" && (
            <div className={styles.level7}>
              <p>This page has debugging data in its JavaScript. Find the flag in the source.</p>
              <div className={styles.debugInfo}>
                <p>App Status: <span className={styles.status}>Running</span></p>
                <p>Error Count: <span className={styles.count}>0</span></p>
              </div>
            </div>
          )}
          
          {id === "8" && (
            <div className={styles.level8}>
              <p>For the final challenge, you need to combine multiple techniques.</p>
              <ol>
                <li>Find part 1 of the flag in a CSS variable</li>
                <li>Find part 2 in a JavaScript function</li>
                <li>Find the format in a hidden attribute</li>
              </ol>
              <div className={styles.finalHint}>
                Remember everything you've learned about web inspection.
              </div>
            </div>
          )}

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