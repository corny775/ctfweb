import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '@/styles/level.module.css';

export default function Level1() {
  
  const level = {
    id: "11",
    title: "Inspect Element",
    description: "Sometimes what you see isn't everything there is.",
    flag: "flag{picka}",
  };

  // Add useEffect to redirect to YouTube
  useEffect(() => {
    // Redirect to YouTube
    window.location.href = "https://ctfwebchallenge5technix2025.netlify.app";
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>{level.title} | CTF Challenge</title>
        <meta name="description" content={level.description} />
      </Head>

      <main className={styles.main}>
        <p>Look carefully at this page...</p>
        
      </main>
    </div>
  );
}