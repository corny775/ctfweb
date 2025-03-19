import React, { useState, useRef, useEffect } from 'react';
import styles from '@/styles/terminal.module.css';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState(['Welcome to Terminal Simulator. Type ls to begin.']);
  const [currentDirectory, setCurrentDirectory] = useState('/');
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // File system structure
  const fileSystem = {
    '/': ['game', 'timestamp'],
    '/game': ['/level/geogussr', '/level/l3', 'level/abba'],
    '/timestamp': ['1:38', '12:56', '6:90']
  };

  // Focus input when component mounts or terminal is clicked
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Process the command when Enter is pressed
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const newHistory = [...history, `${currentDirectory} $ ${input}`];
      
      // Process the command
      const command = input.trim().split(' ');
      
      if (command[0] === 'ls') {
        if (fileSystem[currentDirectory]) {
          newHistory.push(fileSystem[currentDirectory].join('  '));
        } else {
          newHistory.push('Directory not found');
        }
      } 
      else if (command[0] === 'cd') {
        if (command.length === 1 || command[1] === '~' || command[1] === '/') {
          setCurrentDirectory('/');
          newHistory.push('Changed directory to /');
        } else {
          const targetDir = command[1];
          
          if (fileSystem[currentDirectory].includes(targetDir)) {
            const newDir = currentDirectory === '/' 
              ? `/${targetDir}` 
              : `${currentDirectory}/${targetDir}`;
            
            if (fileSystem[newDir]) {
              setCurrentDirectory(newDir);
              newHistory.push(`Changed directory to ${newDir}`);
            } else {
              newHistory.push(`${targetDir} is not a directory`);
            }
          } else {
            newHistory.push(`Directory ${targetDir} not found`);
          }
        }
      }
      else {
        newHistory.push(`Command not found: ${command[0]}`);
      }

      setHistory(newHistory);
      setInput('');
      
      // Scroll to bottom
      setTimeout(() => {
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, 0);
    }
  };

  return (
    <div className={styles.terminalContainer}>
      <div className={styles.terminalWindow}>
        <div className={styles.terminalHeader}>
          <div className={styles.terminalButtons}>
            <div className={styles.terminalButton} style={{ backgroundColor: '#ff5f56' }}></div>
            <div className={styles.terminalButton} style={{ backgroundColor: '#ffbd2e' }}></div>
            <div className={styles.terminalButton} style={{ backgroundColor: '#27c93f' }}></div>
          </div>
          <div className={styles.terminalTitle}>Terminal</div>
        </div>
        <div 
          ref={terminalRef}
          className={styles.terminalContent}
          onClick={handleClick}
        >
          {history.map((line, index) => (
            <div key={index} className={styles.terminalLine}>
              {line}
            </div>
          ))}
          <div className={styles.terminalPrompt}>
            <span>{currentDirectory} $ </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={styles.terminalInput}
              autoFocus
            />
          </div>
        </div>
      </div>
      <div className={styles.terminalHelp} >
        Available commands: ls, cd [directory]
      </div>
    </div>
  );
};

export default Terminal;