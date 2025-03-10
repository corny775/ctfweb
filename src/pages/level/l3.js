import styles from '@/styles/l3.module.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Level3() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Set document title
    document.title = 'Level 3';
    
    // Fetch message.txt
    fetch('/message.txt')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(text => {
        setMessage(text);
        console.log("Message loaded:", text); // Debug log
      })
      .catch(error => {
        console.error('Error fetching message.txt:', error);
        setMessage('Error loading message');
      });
  }, []);

  return (
    <div className={styles.container}>
      {/* Add a visible image element as a fallback */}
      <div className={styles.backgroundImageFallback} />
      
      {/* Message container with visible content */}
      <div 
        id="message-container" 
        className={styles.messageContainer}
      >
        {message ? message : 'Loading message...'}
        {/* Debug comment: *34w*hole_qe} */}
      </div>
    </div>
  );
}