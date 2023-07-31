const startingDiceCount = 5;
const isGameOver = (game) => {
  for (const player in game.diceCount) {
    if (game.diceCount[player] <= 0) {
      return true;
    }
  }
  return false;
};
const getScores = (game) => {
  return Object.entries(game.diceCount).reduce((acc, [playerId, score]) => {
    const winLoss = score <= 0 ? "WON" : "LOST";
    acc[playerId] = winLoss;
    return acc;
  }, {});
};
Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 4,
  setup: (playerIds) => {
    const diceCount = Object.fromEntries(
      playerIds.map((playerId) => [
        playerId,
        startingDiceCount
      ])
    );
    return {
      gameDice: [],
      diceCount,
      currentPlayerIndex: 0,
      previousPlayerIndex: -1,
      selectedPlayerId: "",
      // challengeCounter: 0,
      // challengeStatus: false,
      // challengeCounter: 0,
      // challengeStatus: false,
      playerToRoll: true,
      playerPlaying: false,
      gameOver: false,
      showHelp: false,
      selectedDieIndex: -1
    };
  },
  actions: {
    shareCake: ({ playerId, playerIds, dieIndex }, { game }) => {
      if (playerId === void 0) {
        playerId = "spectator";
      } else if (game.diceCount[playerId] === void 0) {
        throw Rune.invalidAction();
      }
      const otherPlayers = [];
      for (let i = 0; i < playerIds.length; i++) {
        const id = playerIds[i];
        if (id !== playerId && id != null) {
          otherPlayers.push(id);
        }
      }
      for (let i = 0; i < otherPlayers.length; i++) {
        const id = otherPlayers[i];
        if (id === void 0 || game.diceCount[id] === void 0) {
          throw Rune.invalidAction();
        }
        game.diceCount[id] += 1;
      }
      game.diceCount[playerId] += -1;
      game.gameDice.splice(dieIndex, 1);
      const gameOver = isGameOver(game);
      if (gameOver) {
        Rune.gameOver({
          players: getScores(game)
        });
      }
    },
    popBalloons: ({ playerId, dieIndex }, { game }) => {
      if (playerId === void 0) {
        playerId = "spectator";
      } else if (game.diceCount[playerId] === void 0) {
        throw Rune.invalidAction();
      }
      game.diceCount[playerId] += -1;
      game.gameDice.splice(dieIndex, 1);
      const gameOver = isGameOver(game);
      if (gameOver) {
        Rune.gameOver({
          players: getScores(game)
        });
      }
    },
    setSelectedDieIndex: ({ dieIndex }, { game }) => {
      game.selectedDieIndex = dieIndex;
    },
    giveGifts: ({ playerId, opponentId, dieIndex }, { game }) => {
      if (playerId === void 0) {
        playerId = "spectator";
      } else if (game.diceCount[playerId] === void 0) {
        throw Rune.invalidAction();
      }
      let randomGift = Math.floor(Math.random() * 4 - 1);
      if (randomGift === 0)
        randomGift = 1;
      game.diceCount[opponentId] += randomGift;
      game.diceCount[playerId] += -1;
      game.gameDice.splice(dieIndex, 1);
      const gameOver = isGameOver(game);
      if (gameOver) {
        Rune.gameOver({
          players: getScores(game)
        });
      }
    },
    updateDiceCount: ({ playerId, amount }, { game }) => {
      if (playerId === void 0) {
        playerId = "spectator";
      } else if (game.diceCount[playerId] === void 0) {
        throw Rune.invalidAction();
      }
      game.diceCount[playerId] += amount;
      const gameOver = isGameOver(game);
      if (gameOver) {
        Rune.gameOver({
          players: getScores(game)
        });
      }
    },
    // updateChallengeCount: ({amount},  {game}) => {
    //   game.challengeCounter += amount;
    // },
    // updateChallengeStatus: ({status}, {game} ) => {
    //   game.challengeStatus = status
    // },
    // updateChallengeCount: ({amount},  {game}) => {
    //   game.challengeCounter += amount;
    // },
    // updateChallengeStatus: ({status}, {game} ) => {
    //   game.challengeStatus = status
    // },
    rollDice: ({ numDice }, { game }) => {
      game.gameDice = Array.from({ length: numDice }, () => Math.floor(Math.random() * 6) + 1);
      game.playerToRoll = false;
      game.playerPlaying = true;
    },
    nextPlayer: ({ nextIndex }, { game }) => {
      if (!game.gameOver) {
        game.previousPlayerIndex = game.currentPlayerIndex;
        game.currentPlayerIndex = nextIndex;
        game.playerToRoll = true;
        game.playerPlaying = false;
        game.gameDice = [];
      }
    },
    adjustGameDice: ({ index }, { game }) => {
      game.gameDice.splice(index, 1);
    },
    setPreviousPlayer: ({ playerIndex }, { game }) => {
      game.previousPlayerIndex = playerIndex;
    },
    setSelectedPlayerId: ({ playerId }, { game }) => {
      game.selectedPlayerId = playerId;
    }
  },
  events: {
    playerJoined: (playerId, { game }) => {
      game.diceCount[playerId] = startingDiceCount;
    },
    playerLeft(playerId, { game }) {
      delete game.diceCount[playerId];
      game.currentPlayerIndex = Object.keys(game.diceCount).length - 1;
      game.playerToRoll = true;
      game.playerPlaying = false;
      game.gameDice = [];
    }
  }
});
