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
    openStartModal: boolean,
    onboarding: boolean,
    isGameOver: boolean,
    onBoardTime: number,
    playTime: number,
    gameTimer: number,
    timeElapsed: number,
    stopTimer: boolean,
    setBombs: number,
    baselineScore: number,
    playerState: {
      [key: string]: {
        board: TileProp[][];
        gameStarted: boolean;
        bombsPlaced: number;
        bombsFound: number;
        turnEnded: boolean;
        playerTurnTime: number;
      }
    }
  }
  
  export type GameActions = {
    addBombs: () => void,
    updateBombCount: (paraps: {amount:number}) => void,
    userAddBomb: (args: { row: number ; col: number }) => void,
    startOnboarding: () => void,
    setStartGame: () => void,
    swap: () => void,
    flip: (args: { row: number ; col: number }) => void,
    flag: (args: { row: number ; col: number }) => void,
    reveal: (args: { row: number ; col: number }) => void,
    revealReset: () => void,
    endTimer: ()=>void,
  }