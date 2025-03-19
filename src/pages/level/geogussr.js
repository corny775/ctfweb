import { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import styles from '@/styles/geogussr.module.css';

export default function SquidGeoGuessr() {
  const [gameState, setGameState] = useState({
    currentRound: 0,
    totalRounds: 5,
    score: 0,
    gameOver: false,
    winner: false,
    locations: [],
    currentLocation: null,
    guessedLocation: null,
    distance: null,
    showResult: false,
    playerNumber: null, // Set initially to null
    eliminatedPlayers: 0,
  });

  // Component mounted state
  const [isClient, setIsClient] = useState(false);

  // Predefined locations (latitude, longitude, name, image URL)
  const predefinedLocations = [
    { lat: 48.8584, lng: 2.2945, name: "Eiffel Tower, Paris", imageUrl: "/paris.jpg" },
    { lat: 40.7128, lng: -74.0060, name: "New York City", imageUrl: "/nyc.jpg" },
    { lat: -33.8568, lng: 151.2153, name: "Sydney Opera House", imageUrl: "/sydney.jpg" },
    { lat: 27.1751, lng: 78.0421, name: "Taj Mahal, India", imageUrl: "/tajmahal.jpg" },
    { lat: 51.5074, lng: -0.1278, name: "London, UK", imageUrl: "/london.jpg" },
    { lat: 37.7749, lng: -122.4194, name: "San Francisco", imageUrl: "/sanfra.jpg" },
    { lat: 35.6762, lng: 139.6503, name: "Tokyo, Japan", imageUrl: "/tokyo.jpg" },
    { lat: -22.9068, lng: -43.1729, name: "Rio de Janeiro", imageUrl: "/rio.webp" },
    { lat: 41.9028, lng: 12.4964, name: "Rome, Italy", imageUrl: "/rome.jpg" },
    { lat: -13.1631, lng: -72.5450, name: "Machu Picchu, Peru", imageUrl: "/peru.jpg" },
  ];

  // Dynamically import the Map component to avoid SSR issues
  const Map = dynamic(
    () => import('@/components/Map'),
    { 
      ssr: false,
      loading: () => <div className={styles.mapLoading}>Loading map...</div>
    }
  );

  // Mark that we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize game after component mounts on client
  useEffect(() => {
    if (isClient) {
      initializeGame();
    }
  }, [isClient]);

  // Initialize the game with random locations
  const initializeGame = () => {
    // Shuffle and pick 5 random locations
    const shuffled = [...predefinedLocations].sort(() => 0.5 - Math.random());
    const selectedLocations = shuffled.slice(0, 5);
    
    setGameState({
      ...gameState,
      locations: selectedLocations,
      currentLocation: selectedLocations[0],
      currentRound: 1,
      gameOver: false,
      winner: false,
      score: 0,
      playerNumber: Math.floor(Math.random() * 456) + 1,
      eliminatedPlayers: 0,
    });
  };

  // Handle map click (player's guess)
  const handleMapClick = (latlng) => {
    if (gameState.showResult) return;
    
    setGameState({
      ...gameState,
      guessedLocation: latlng,
    });
  };

  // Calculate distance between two coordinates in kilometers
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return Math.round(distance);
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  };

  // Submit the player's guess
  const submitGuess = () => {
    if (!gameState.guessedLocation) return;
    
    const { currentLocation, guessedLocation } = gameState;
    const distance = calculateDistance(
      currentLocation.lat, currentLocation.lng, 
      guessedLocation.lat, guessedLocation.lng
    );
    
    // Calculate score (max 5000 points, decreasing with distance)
    const maxDistance = 20000; // km
    const roundScore = Math.max(0, Math.round(5000 * (1 - distance / maxDistance)));
    
    // Calculate players eliminated based on distance
    const newEliminatedPlayers = Math.min(456 - gameState.eliminatedPlayers - 1, Math.floor(distance / 10));
    
    setGameState({
      ...gameState,
      distance,
      score: gameState.score + roundScore,
      showResult: true,
      eliminatedPlayers: gameState.eliminatedPlayers + newEliminatedPlayers,
    });
  };

  // Move to the next round
  const nextRound = () => {
    const nextRoundNumber = gameState.currentRound + 1;
    
    if (nextRoundNumber > gameState.totalRounds) {
      // Win condition: score more than half the possible points
      const isWinner = gameState.score > 22500;
      
      setGameState({
        ...gameState,
        gameOver: true,
        winner: isWinner,
        showResult: false,
      });
      return;
    }
    
    setGameState({
      ...gameState,
      currentRound: nextRoundNumber,
      currentLocation: gameState.locations[nextRoundNumber - 1],
      guessedLocation: null,
      distance: null,
      showResult: false,
    });
  };

  // Restart the game
  const restartGame = () => {
    initializeGame();
  };

  // Calculate the remaining players
  const remainingPlayers = 456 - gameState.eliminatedPlayers;

  return (
    <div className={styles.container}>
      <Head>
        <title>Squid GeoGuessr</title>
        <meta name="description" content="A Squid Game themed GeoGuessr clone built with Next.js" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css" />
      </Head>
      
      <header className={styles.header}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Squid GeoGuessr</h1>
          {isClient && gameState.playerNumber && (
            <div className={styles.playerBadge}>Player #{gameState.playerNumber}</div>
          )}
        </div>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Round:</span> 
            <span className={styles.statValue}>{gameState.currentRound}/{gameState.totalRounds}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Prize Money:</span> 
            <span className={styles.statValue}>{gameState.score.toLocaleString()} ₩</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Players Alive:</span> 
            <span className={styles.statValue}>{remainingPlayers}</span>
          </div>
        </div>
      </header>

      {gameState.gameOver ? (
        <div className={`${styles.gameOver} ${gameState.winner ? styles.winner : styles.eliminated}`}>
          <div className={styles.gameOverContent}>
            <h2 className={styles.gameOverTitle}>
              {gameState.winner ? "You Survived!" : "Eliminated"}
            </h2>
            <p className={styles.finalScore}>
              Final Prize: {gameState.score.toLocaleString()} ₩
            </p>
            <p className={styles.eliminationCount}>
              Players Eliminated: {gameState.eliminatedPlayers}
            </p>
            <button 
              onClick={restartGame}
              className={styles.playAgainButton}
            >
              {gameState.winner ? "next clue:https://www.youtube.com/watch?v=jVpsLMCIB0Y&t=442s" : "Try Again"}
            </button>
          </div>
        </div>
      ) : (
        <>
          {gameState.currentLocation && (
            <div className={styles.gameGrid}>
              <div className={styles.locationImage}>
                <img 
                  src={gameState.currentLocation.imageUrl} 
                  alt="Location" 
                  className={styles.image}
                />
              </div>
              <div className={styles.mapContainer}>
                <Map 
                  handleMapClick={handleMapClick}
                  guessedLocation={gameState.guessedLocation}
                  actualLocation={gameState.showResult ? gameState.currentLocation : null}
                  showResult={gameState.showResult}
                />
              </div>
            </div>
          )}

          <div className={styles.controls}>
            {gameState.showResult ? (
              <div className={styles.resultPanel}>
                <h3 className={styles.resultTitle}>Round Result</h3>
                <p>Actual location: {gameState.currentLocation.name}</p>
                <p>Distance: {gameState.distance} km</p>
                <p>Prize added: {Math.max(0, Math.round(5000 * (1 - gameState.distance / 20000))).toLocaleString()} ₩</p>
                {gameState.distance > 0 && (
                  <p className={styles.eliminationText}>
                    {Math.min(456 - gameState.eliminatedPlayers - 1, Math.floor(gameState.distance / 10))} players eliminated
                  </p>
                )}
                <button 
                  onClick={nextRound}
                  className={styles.nextButton}
                >
                  Next Game
                </button>
              </div>
            ) : (
              <button 
                onClick={submitGuess}
                disabled={!gameState.guessedLocation}
                className={`${styles.guessButton} ${!gameState.guessedLocation ? styles.disabled : ''}`}
              >
                {gameState.guessedLocation ? 'Make Your Move' : 'Click on the map to guess'}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}