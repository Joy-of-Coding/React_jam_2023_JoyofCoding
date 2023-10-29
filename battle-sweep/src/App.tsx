import React, { useEffect, useRef, useState } from "react";
import { GameState } from "./helper/Types.ts";
import type { Players, PlayerId } from "rune-games-sdk/multiplayer";
import Board from "./components/Board.tsx";
import OpponentBoard from "./components/OpponentBoard";
import "./App.css";
import Player from "./components/Player.tsx";
import Controls from "./components/Controls.tsx";
// import InPlay from "./components/InPlay.tsx";
import { HelpPopup } from "./components/HelpPopup.tsx";
import { motion, AnimatePresence } from "framer-motion";
import Timer from "./components/Timer.tsx";
import StartPage from "./components/StartPage.tsx";

function App() {
  const [game, setGame] = useState<GameState>();
  const [players, setPlayers] = useState<Players>({});
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId>();
  const playerIds = Object.keys(players);
  const [openHelp, setOpenHelp] = useState(false);
  const [useFlag, setUseFlag] = useState(false);
  const [opponentId, setOpponentId] = useState("");
  const timerRef = useRef<number>(0);

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, players, yourPlayerId }) => {
        setGame(game);
        setPlayers(players);
        setYourPlayerId(yourPlayerId);
      },
    });
  }, []);

  useEffect(() => {
    if (game?.isGameOver) {
      setUseFlag(false);
      setOpenHelp(false);
      clearTimeout(timerRef.current || 0);
    }

    if (game?.onboarding && playerIds.length < 2) {
      Rune.actions.swap();
    }
    if (playerIds.length == 2 && game) {
      game.playerIds.forEach((id) => {
        if (id !== yourPlayerId) {
          setOpponentId(id);
        }
      });
    }
  }, [game, playerIds, yourPlayerId]);

  const handleTilePress = (row: number, col: number) => {
    if (game?.onboarding) {
      Rune.actions.userAddBomb({ row, col });
      return;
    }
    if (useFlag) {
      Rune.actions.flag({ row, col });
    } else {
      Rune.actions.flip({ row, col });
    }
  };

  const handleLongTilePress = (row: number, col: number) => {
    if (game?.onboarding) {
      return;
    }
    clearTimeout(timerRef.current || 0);
    timerRef.current = 0;

    timerRef.current = setTimeout(() => {
      Rune.actions.revealReset();
      clearTimeout(timerRef.current || 0);
      timerRef.current = 0;
    }, 1500);

    Rune.actions.reveal({ row, col });
  };

  const toggleFlagState = () => {
    setUseFlag(!useFlag);
  };

  const checkStartGame = () => {
    if (game) {
      if (playerIds.length >= 2) {
        Rune.actions.setStartGame();
        game.playerIds.forEach((id) => {
          if (id !== yourPlayerId) {
            if (game.playerState[id].gameStarted === true) {
              Rune.actions.startOnboarding();
            }
          }
        });
      } else {
        Rune.actions.startOnboarding();
      }
    }
  };

  if (!game) {
    return <div>Loading...</div>;
  }

  if (game.openStartModal) {
    return <StartPage game={game} closeStart={checkStartGame} />;
  }

  /*
<InPlay
        game={game}
        playerId={yourPlayerId || ""}
        onboarding={game.onboarding}
      />

*/
  if (game.onboarding) {
    ///////////// Onboarding /////////////////
    return (
      <>
        {playerIds.map((id) => (
          <React.Fragment key={id + "-player-view"}>
            <Player
              players={players}
              // explaining because this is confusing: (onboarding)
              // if the current ID in loop does not match my ID as the client loading page
              // // show my ID because it will associate my avatar in line with opponents board
              // if my ID (yourPlayerId) doesn't exist as a client (spectator), then show the current loop ID
              // // (aka show show component for every ID in loop)
              // lastly if the current loop ID IS my ID show nothing - we want opponents avatar
              playerId={id != yourPlayerId ? yourPlayerId || id : ""}
            />
            {id != yourPlayerId && (
              <>
                <h3>Hide Dragons on Opponent's Board</h3>
                <Timer game={game} />
                <p>Total Dragons: {game.setBombs} </p>
                {yourPlayerId && (
                  <div className="flex">
                    <Controls
                      onboarding={game.onboarding}
                      toggleFlag={toggleFlagState}
                      useFlag={useFlag}
                    />
                    <div>
                      {openHelp && (
                        <HelpPopup closePopup={() => setOpenHelp(false)} />
                      )}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="button"
                        onClick={() => setOpenHelp(true)}
                      >
                        <b>?</b>
                      </motion.button>
                    </div>
                  </div>
                )}
                <Board
                  onPress={handleTilePress}
                  onLongPress={handleLongTilePress}
                  display={
                    game.onboarding ? id !== yourPlayerId : id === yourPlayerId
                  }
                  board={game.playerState[`${id}`].board}
                />
              </>
            )}
          </React.Fragment>
        ))}
      </>
    );
  } else {
    ///////////// Game Play  /////////////////
    return (
      <>
        {playerIds.map((id) => (
          <React.Fragment key={id + "-player-view"}>
            {yourPlayerId &&
              id != yourPlayerId &&
              game.playerState[yourPlayerId].turnEnded &&
              !game.isGameOver && (
                <div className="popup-container">
                  <AnimatePresence>
                    <motion.div
                      transition={{ duration: 0.5 }}
                      animate={{ x: 0 }}
                      initial={{ x: 250 }}
                      className="popup-body"
                    >
                      <h2>You've been bitten by the dragons!</h2>
                      <h3>Waiting for opponent</h3>
                      <Timer game={game} />
                      <Board
                        onPress={() => null}
                        onLongPress={() => null}
                        display={
                          !game.onboarding
                            ? id !== yourPlayerId
                            : id === yourPlayerId
                        }
                        board={game.playerState[`${id}`].board}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}
            <div className="header">
              <Player
                players={players}
                // if current loop ID is me, show me
                // if current loop ID is not me, but my ID is defined show nothing
                // // if my ID is undefined (spectator) show everything
                playerId={
                  id == yourPlayerId ? yourPlayerId : yourPlayerId ? "" : id
                }
              />
              {id == yourPlayerId && opponentId && (
                <OpponentBoard
                  onPress={() => null}
                  onLongPress={() => null}
                  board={game.playerState[`${opponentId}`].board}
                />
              )}
            </div>
            {(id == yourPlayerId || !yourPlayerId) && (
              <>
                <h3>Find, Trap, and TAME all Dragons!</h3>
                <p>Total Dragons: {game.setBombs} </p>
                <Timer game={game} />
                {yourPlayerId && (
                  <div className="flex">
                    <Controls
                      onboarding={game.onboarding}
                      toggleFlag={toggleFlagState}
                      useFlag={useFlag}
                    />
                    <div>
                      {openHelp && (
                        <HelpPopup closePopup={() => setOpenHelp(false)} />
                      )}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="button"
                        onClick={() => setOpenHelp(true)}
                      >
                        <b>?</b>
                      </motion.button>
                    </div>
                  </div>
                )}
                <Board
                  key={id + "-board"}
                  onPress={handleTilePress}
                  onLongPress={handleLongTilePress}
                  display={
                    game.onboarding ? id !== yourPlayerId : id === yourPlayerId
                  }
                  board={game.playerState[`${id}`].board}
                />
              </>
            )}
          </React.Fragment>
        ))}
      </>
    );
  }
}

export default App;
