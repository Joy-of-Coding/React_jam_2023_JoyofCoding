import { useCallback, useRef } from "react";
import { isMobile } from "react-device-detect";

export default function useLongPress(
  onClick: (row: number, col: number) => void,
  onLongPress: (row: number, col: number) => void,
  row: number,
  col: number,
  ms = 500
) {
  // used to persist the timer state
  // non zero values means the value has never been fired before
  const timerRef = useRef<number>(0);

  // clear timed callback
  const endTimer = () => {
    clearTimeout(timerRef.current || 0);
    timerRef.current = 0;
  };

  // init timer
  const onStartLongPress = useCallback(() => {
    // stop any previously set timers
    endTimer();

    // set new timeout
    timerRef.current = setTimeout(() => {
      onLongPress(row, col);
      endTimer();
    }, ms);
  }, [onLongPress, ms, row, col]);

  // determine to end timer early and invoke the callback or do nothing
  const onEndLongPress = useCallback(() => {
    // run the callback fn the timer hasn't gone off yet (non zero)
    if (timerRef.current) {
      endTimer();
      onClick(row, col);
    }
  }, [onClick, row, col]);

  if (isMobile) {
    return {
      onTouchStart: onStartLongPress,
      onTouchEnd: onEndLongPress,
    };
  } else {
    return {
      onMouseDown: onStartLongPress,
      onMouseUp: onEndLongPress,
      onMouseLeave: onEndLongPress,
    };
  }
}

/*
Implementation:
const [onStart, onEnd] = useLongPress(onPress, pressTest, row, col);
<div>
onTouchStart={onStart}
onTouchEnd={onEnd}
</div>

Use:
return [onStartLongPress, onEndLongPress, endTimer];

OR
Implementation:
const LongPress = useLongPress(pressTest, onPress, row, col);
<div> {...LongPress} </div>

Use:
  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  };
}
*/
