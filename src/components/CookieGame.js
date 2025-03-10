// components/CookieGame.js

import React, { useState, useRef, useEffect } from 'react';
import styles from '@/styles/cookieGame.module.css';

const CookieGame = ({ onSuccess }) => {
  const [gameState, setGameState] = useState('ready'); // ready, playing, success, failed
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingPath, setDrawingPath] = useState([]);
  const [shapePath, setShapePath] = useState([]);
  
  const canvasRef = useRef(null);
  const cookieRef = useRef(null);
  
  // Shape for the cookie challenge
  const cookieShape = [
    // Cookie shape - circle with pattern inside
    { x: 150, y: 100 },
    { x: 200, y: 150 },
    { x: 150, y: 200 },
    { x: 100, y: 150 },
    { x: 150, y: 100 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Reset canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw cookie background
    ctx.fillStyle = '#E6C7A8';
    ctx.beginPath();
    ctx.arc(150, 150, 120, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw shape outline
    setShapePath(cookieShape);
    
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 2;
    ctx.beginPath();
    cookieShape.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        ctx.lineTo(point.x, point.y);
      }
    });
    ctx.stroke();
    
    // Draw user's path if exists
    if (drawingPath.length > 0) {
      ctx.strokeStyle = '#FF0000';
      ctx.lineWidth = 3;
      ctx.beginPath();
      drawingPath.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.stroke();
    }
  }, [drawingPath]);

  const handleMouseDown = (e) => {
    if (gameState !== 'ready') return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if starting point is on the shape
    const isOnShape = isPointNearShape(x, y, shapePath, 10);
    
    if (isOnShape) {
      setGameState('playing');
      setIsDrawing(true);
      setDrawingPath([{ x, y }]);
    } else {
      setGameState('failed');
      setTimeout(() => {
        setGameState('ready');
        setDrawingPath([]);
      }, 1000);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Add point to drawing path
    setDrawingPath(prev => [...prev, { x, y }]);
    
    // Check if user went outside shape boundary
    const isOutsideShape = !isPointNearShape(x, y, shapePath, 15);
    
    if (isOutsideShape) {
      setGameState('failed');
      setIsDrawing(false);
      
      // Shake the cookie
      if (cookieRef.current) {
        cookieRef.current.classList.add(styles.shake);
        setTimeout(() => {
          cookieRef.current.classList.remove(styles.shake);
          setGameState('ready');
          setDrawingPath([]);
        }, 1000);
      }
    }
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    // Check if the shape is complete (last point is near the first point of the shape)
    const firstPoint = shapePath[0];
    const lastDrawnPoint = drawingPath[drawingPath.length - 1];
    
    const distance = Math.sqrt(
      Math.pow(lastDrawnPoint.x - firstPoint.x, 2) + 
      Math.pow(lastDrawnPoint.y - firstPoint.y, 2)
    );
    
    if (distance < 20 && drawingPath.length > shapePath.length / 2) {
      setGameState('success');
      
      // Trigger success callback after a delay
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        }
      }, 1500);
    } else {
      setGameState('failed');
      
      // Shake the cookie
      if (cookieRef.current) {
        cookieRef.current.classList.add(styles.shake);
        setTimeout(() => {
          cookieRef.current.classList.remove(styles.shake);
          setGameState('ready');
          setDrawingPath([]);
        }, 1000);
      }
    }
  };

  // Utility function to check if a point is near any point on the shape path
  const isPointNearShape = (x, y, shapePath, threshold) => {
    for (let i = 0; i < shapePath.length - 1; i++) {
      const p1 = shapePath[i];
      const p2 = shapePath[i + 1];
      
      // Calculate distance from point to line segment
      const distance = distanceToLineSegment(p1, p2, { x, y });
      if (distance < threshold) {
        return true;
      }
    }
    return false;
  };

  // Calculate distance from point to line segment
  const distanceToLineSegment = (p1, p2, point) => {
    const { x, y } = point;
    const { x: x1, y: y1 } = p1;
    const { x: x2, y: y2 } = p2;
    
    const A = x - x1;
    const B = y - y1;
    const C = x2 - x1;
    const D = y2 - y1;
    
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    
    if (lenSq !== 0) {
      param = dot / lenSq;
    }
    
    let xx, yy;
    
    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }
    
    const dx = x - xx;
    const dy = y - yy;
    
    return Math.sqrt(dx * dx + dy * dy);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cookie Challenge</h1>
      
      <div 
        ref={cookieRef} 
        className={`${styles.cookieContainer} ${gameState === 'failed' ? styles.shake : ''}`}
      >
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className={styles.cookieCanvas}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        />
        
        {gameState === 'success' && (
          <div className={styles.overlay}>
            <div className={styles.successText}>Success!</div>
          </div>
        )}
        
        {gameState === 'failed' && (
          <div className={styles.overlay}>
            <div className={styles.failedText}>Try Again</div>
          </div>
        )}
      </div>
      
      <div className={styles.instructions}>
        <p>
          {gameState === 'ready' ? 
            "Click on the shape and trace around it without lifting your finger. Don&apos;t break the cookie!" : 
            gameState === 'playing' ? 
            "Carefully trace the shape..." : 
            gameState === 'success' ? 
            "Great job! Moving to Level 2..." : 
            "The cookie broke! Try again."}
        </p>
        
        <ul>
          <li>Click on the shape outline to begin</li>
          <li>Hold the mouse button and trace the shape</li>
          <li>Release when you complete the shape</li>
          <li>Don't go outside the lines or the cookie will break!</li>
        </ul>
      </div>
    </div>
  );
};

export default CookieGame;