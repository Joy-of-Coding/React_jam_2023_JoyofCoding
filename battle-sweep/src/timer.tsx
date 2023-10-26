import React, { useState, useEffect } from "react";

interface TimerProps {
  initialTime: number;
  onTimerEnd: () => void;
}

function Timer({ initialTime, onTimerEnd }: TimerProps) {
  const [timer, setTimer] = useState<number>(initialTime);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          return prevTimer - 1;
        });
      }, 1000);

      // Clean up the timer when the component unmounts
      return () => {
        clearInterval(interval);
      };
    } else {
      // Timer has reached 0, trigger a callback
      onTimerEnd();
    }
  }, [onTimerEnd, timer]);

  return <p>Timer: {timer} second(s)</p>;
}

export default Timer;
