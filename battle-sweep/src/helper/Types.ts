import { PlayerId } from "rune-games-sdk";

export interface TileProp {
    row: number,
    col: number,
    isBomb: boolean;
    isFlipped: boolean;
    isMarked: boolean;
    setReveal: boolean;
    value: number;
  }
  
  export interface GameState {
    playerIds: PlayerId[],
    onboarding: boolean,
    isGameOver: boolean,
    setBombs: number,
    baselineScore: number,
    playerState: {
      [key: string]: {
        board: TileProp[][];
        bombsPlaced: number;
        bombsFound: number;
      }
    }
  }
  
  export type GameActions = {
    addBombs: () => void,
    userAddBomb: (args: { row: number ; col: number }) => void,
    swap: () => void,
    flip: (args: { row: number ; col: number }) => void,
    flag: (args: { row: number ; col: number }) => void,
    reveal: (args: { row: number ; col: number }) => void,
    revealReset: () => void,
  }