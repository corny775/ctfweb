// pages/index.js
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Audio controls
  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Initialize audio on client side only (to avoid SSR issues)
  useEffect(() => {
    audioRef.current = new Audio('/sounds/sound.dat.unknown');
    audioRef.current.loop = true;
    
    // Clean up on component unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  return (
    <div className="background-container">
      <Head>
        <title>Next.js Background with Sound</title>
        <meta name="description" content="A Next.js app with background and sound" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="content">
          <h1>Want to spend time?</h1>
          <button 
            onClick={toggleAudio} 
            className="sound-button"
          >
            {isPlaying ? 'Pause Music' : 'Play Music'}
          </button>
        </div>
      </main>

      <style jsx>{`
        .background-container {
          width: 100vw;
          height: 100vh;
          background-image: url('/pictureB1.png');
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .content {
          background-color: rgba(0, 0, 0, 0.7);
          padding: 2rem;
          border-radius: 1rem;
          text-align: center;
        }
        
        .sound-button {
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 0.5rem;
          background-color: #4a90e2;
          color: white;
          cursor: pointer;
          font-size: 1rem;
        }
        
        .sound-button:hover {
          background-color: #357abd;
        }
      `}</style>
    </div>
  );
}