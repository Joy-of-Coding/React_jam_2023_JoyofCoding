import React, { useState, useEffect } from "react";

interface TimerProps {
  initialTime: number;
  endFunction: ()=>void;
  // setTimerDuration: (duration: number)=>void;
}

function Timer({ initialTime, endFunction }: TimerProps) {
    const [timer, setTimer] = useState<number>(initialTime);

    //CHOP CHOP code here:
    // const [timeRemaining, setTimeRemaining] = useState(
    //     Rune.gameTimeInSeconds() - order.startedAt
    // );
    //
    // useEffect(() => {
    //     setTimeout(() => {
    //         setTimeRemaining(order.completeBy - Rune.gameTimeInSeconds());
    //     }, 1000);
    // }, [timeRemaining, order]);


  useEffect(() => {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
            return prevTimer - 1;
        });
      }, 1000);

      // Clean up the timer when the component unmounts
      return () => {
        clearInterval(interval);
      };

  }, [timer] );



    useEffect(() => {
        if (timer===0) {
            endFunction();
        }
    }, [timer]);

  return (
      <div>
        {timer>0 &&
            <>
                <p>Timer: {timer} second(s)</p>

            </>
      }


      </div>

  );
}

export default Timer;
