// components/Bridge.js
import React, { useState, useEffect } from 'react';
import styles from '@/styles/bridge.module.css';

export default function BridgeGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [fallingPlayer, setFallingPlayer] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ minutes: 5, seconds: 0, milliseconds: 0 });
  const failureLink = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

  const bridge = [
    { left: true, right: false },
    { left: false, right: true },
    { left: true, right: false },
    { left: true, right: false },
    { left: false, right: true },
    { left: true, right: false },
    { left: false, right: true },
    { left: false, right: true },
  ];

  // Timer Effect
  useEffect(() => {
    if (!gameStarted || gameOver || gameWon) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.milliseconds > 0) return { ...prev, milliseconds: prev.milliseconds - 1 };
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1, milliseconds: 99 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59, milliseconds: 99 };
        clearInterval(timer);
        setGameOver(true);
        setTimeout(() => window.location.href = failureLink, 2000);
        return prev;
      });
    }, 10);

    return () => clearInterval(timer);
  }, [gameStarted, gameOver, gameWon]);

  const handleStart = () => {
    setGameStarted(true);
    setCurrentStep(0);
    setGameOver(false);
    setGameWon(false);
    setTimeLeft({ minutes: 5, seconds: 0, milliseconds: 0 });
    setFallingPlayer(null);
  };

  const handleTileClick = (position) => {
    const correct = bridge[currentStep][position];
    if (correct) {
      if (currentStep === bridge.length - 1) setGameWon(true);
      else setCurrentStep(prev => prev + 1);
    } else {
      setGameOver(true);
      setFallingPlayer(position);
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        setTimeout(() => window.location.href = failureLink, 2000);
      }, 500);
    }
  };

  return (
    <div className={`${styles.container} ${isShaking ? styles.shake : ''}`}>
      {!gameStarted && (
        <div className={styles.startScreen}>
          <h1>Squid Game Bridge Challenge</h1>
          <button onClick={handleStart} className={styles.startButton}>Start Game</button>
        </div>
      )}
      {gameStarted && (
        <div className={styles.gameArea}>
          <div className={styles.timer}>
            {timeLeft.minutes}:{timeLeft.seconds < 10 ? '0' : ''}{timeLeft.seconds}.{timeLeft.milliseconds}
          </div>
          <div className={styles.bridge}>
            {bridge.map((step, index) => (
              <div key={index} className={styles.step}>
                <div
                  className={`${styles.tile} ${index === currentStep ? styles.active : ''}`}
                  onClick={() => index === currentStep && handleTileClick('left')}
                >Left</div>
                <div
                  className={`${styles.tile} ${index === currentStep ? styles.active : ''}`}
                  onClick={() => index === currentStep && handleTileClick('right')}
                >Right</div>
              </div>
            ))}
          </div>
          {gameOver && <div className={styles.message}>Game Over! You fell from {fallingPlayer} tile!</div>}
          {gameWon && <div className={styles.message}>Congratulations! The clue is bonana!</div>}
        </div>
      )}
    </div>
  );
}
