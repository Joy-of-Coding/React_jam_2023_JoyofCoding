import type { RuneClient } from "rune-games-sdk/multiplayer"
// import {Simulate} from "react-dom/test-utils";
// import play = Simulate.play;

export interface GameState {
  count: number,
  diceArrays: Record<string,number[]>,
  counters:Record<string, number>,
  currentPlayerIndex: number
}

type GameActions = {
  changeCounter: (params: {
    playerId: string;
    amount: number;
  }) => void;
  increment: (params: { amount: number }) => void,
  updatePlayerDie: (params: {playerId: string, dieValue: number, dieIndex: number}) => void,
  rollAllDice: (params: {playerId: string}) => void,
  nextPlayer: (params:{nextPlayerIndex: number}) => void,
  // checkGamePlay: (params:{players: Record<string, any>, playerId: string}) => void
  removeDie:(params:{playerId: string, count: number}) => void

}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

export function getCount(game: GameState) {
  return game.count
}



Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 4,
  setup: (playerIds): GameState => {
    const diceArrays = Object.fromEntries(
        playerIds.map((playerId) => [
          playerId,
          Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1),
        ])
    );

    return {
      currentPlayerIndex:0,
      count: 0,
      counters: Object.fromEntries(playerIds.map(playerId => [playerId, 0])),
      diceArrays,
    }
  },
  actions: {
    increment: ({ amount }, { game }) => {
      game.count += amount
    },
    updatePlayerDie: ({playerId, dieValue, dieIndex },{game}) => {
      game.diceArrays[playerId][dieIndex] = dieValue
    },
    changeCounter({playerId, amount}, {game}) {
      if (game.counters[playerId] === undefined) {
        throw Rune.invalidAction(); // incorrect playerId passed to the action
      }
      game.counters[playerId] += amount;
    },
    rollAllDice: ({playerId}, {game}) => {
      game.diceArrays[playerId] = game.diceArrays[playerId].map(() => Math.floor(Math.random() * 6) + 1);
      // checkForFives( game.diceArrays[playerId] )
    },
    nextPlayer: ({nextPlayerIndex}, {game}) => {
      game.currentPlayerIndex = nextPlayerIndex;
    },
    removeDie: ({playerId, count}, {game}) => {
      console.log("Die to remove", count)
    }
  },
  events: {
    playerJoined: (playerId, {game}) => {
      game.counters[playerId] = 0;
      game.diceArrays[playerId]=Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1)
    },
    playerLeft(playerId, {game}) {
      delete game.counters[playerId];
      delete game.diceArrays[playerId];
    },
  }
})
