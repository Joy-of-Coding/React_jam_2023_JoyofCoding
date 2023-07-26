import React, { useState, useEffect } from 'react';

const SideScrollerGame = () => {
  const [characterX, setCharacterX] = useState(0); // New state for horizonal position
  const [characterY, setCharacterY] = useState(0); // New state for vertical position
  const [isJumping, setIsJumping] = useState(false); //New state for jump status

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      setCharacterX((prevX) => prevX - 5); // Move left by 5 units
    } else if (event.key === 'ArrowRight') {
      setCharacterX((prevX) => prevX + 5); // Move right by 5 units
    } else if (event.key === 'ArrowUp' && !isJumping) {
        // Check if not already jumping to avoid multiple jumps
        setIsJumping(true); // Start jumping
        setCharacterY((prevY) => prevY - 100); // Adjust the value for the desired jump height
        console.log('I am jumping')
    }
  };

  useEffect(() => {
    
    window.addEventListener('keydown', handleKeyDown);

    // Implement jumping effect and reset the jump after some time
    if (isJumping) {
        const jumpTimeout = setTimeout(() => {
            setCharacterY((prevY) => prevY + 100); // Adjust the value for the desired jump height
            setIsJumping(false); // Reset the jump status
          }, 500); // Adjust the timeout value for the desired jump duration
    
          // Clean up the timeout on unmount to avoid memory leaks
          return () => clearTimeout(jumpTimeout);
    }

    // Clean up event listeners on unmount
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
  }, [isJumping]);

  return (
    <div>
      <div
        style={{
          position: 'absolute',
          top: `${200 + characterY}px`, 
          left: `${characterX}px`,
          width: '50px',
          height: '50px',
          background: 'blue', 
        }}
      />
    </div>
  );
};

export default SideScrollerGame;