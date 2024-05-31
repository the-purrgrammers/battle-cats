import "../styles/index.css";
import "../styles/oppGame.css";
import { initializeSocket } from "../socket";
const socket = initializeSocket();

import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import EndTurnButton from "../Components/EndTurnButton";
import OpponentShipMap from "../Components/OpponentShipMap";
import PlayerShipMap from "../Components/PlayerShipMap";
import WinLoseScreen from "../Components/WinLoseScreen";
import ChatBox from "../Components/ChatBox";
import SetBoard from "../Components/SetBoard";
import logoLong from "../assets/logo-long-cat.png"

const GamePage = ({curUser}) => {
  const [playerId, setPlayerId] = useState("");
  const [turn, setTurn] = useState("");
  const [oppId, setOppId] = useState();
  const [oppGameState, setOppGameState] = useState([]);
  const [myGameState, setMyGameState] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);
  const [msg, setMsg] = useState("");
  const [winnerId, setWinnerId] = useState(null);
  const [gameId, setGameId] = useState("");
  const [catsLeft, setCatsLeft] = useState([]);
  const [catInfo, setCatInfo] = useState([])
  const [oppCatInfo, setOppCatInfo] = useState([])
  const [opponentDisconnected, setOpponentDisconnected] = useState(false);
  const navigate = useNavigate()


  //when one player completes setting their board, they share it along with the turn so that
  //you can set your oppGameState
  socket.on("receiveBoardAndTurn", (board, turn) => {
    setOppGameState(board[board.length - 1][oppId]);
    if (playerId === "p1") {
      setOppCatInfo(board[0].p2Cats)
    } else {
      setOppCatInfo(board[0].p1Cats)
    }
    setTurn(turn);
  });

  //after the opposing player has pressed the endturn button,
  //the new gamestate is shared to both players via websocket
  socket.on("updatedTurn", (data) => {
    setMsg("");
    if (data.winnerId) {
      setWinnerId(data.winnerId);
    }
    const currentIndex = data.gameState.length - 1;
    const newGame = data.gameState[currentIndex];
    const newTurn = newGame.turn;
    setTurn(newTurn);
    setOppGameState(newGame[oppId]);
    setMyGameState(newGame[playerId]);
    if (data.msg) {
      setMsg(data.msg);
    }
  });

  //code for refreshing: if connection is lost, go into session storage and
  //get all the necessary info
  useEffect(() => {
    const isPlayingAs = sessionStorage.getItem("player");
    if (!isPlayingAs) {
      socket.on("assignPlayer", (data) => {
        if (data.player === "p1") {
          sessionStorage.setItem("player", "p1");
          setPlayerId("p1");
          setOppId("p2");
        } else {
          sessionStorage.setItem("player", "p2");
          setPlayerId("p2");
          setOppId("p1");
        }
      });
    } else {
      setPlayerId(isPlayingAs);
      const room = sessionStorage.getItem("room");
      socket.emit("joinRoom", room);
      const opponent = isPlayingAs === "p1" ? "p2" : "p1";
      setOppId(opponent);
    }

    //look in localstorage for token, re-fetch the most recent game state if you lose it
    const refreshGame = async () => {
      const gameToken = sessionStorage.getItem("gameToken")
      if (gameToken) {
        const result = await fetch('/api/game', {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${gameToken}`
          },
        })
        const refreshedGame = await result.json();
        const game = refreshedGame.currentGame;
        const player = refreshedGame.player;
        setPlayerId(player);
        if (player === 'p1') {
          setOppId('p2')
          setMyGameState(game.gameState[game.gameState.length - 1].p1)
          setOppGameState(game.gameState[game.gameState.length - 1].p2)
          setCatsLeft(game.gameState[game.gameState.length - 1].p2ShipsSunk)
          setCatInfo(game.gameState[0].p1Cats)
          if (game.gameState[0].p2Cats){
            setOppCatInfo(game.gameState[0].p2Cats)
          }

        } else {
          setOppId('p1');
          setMyGameState(game.gameState[game.gameState.length - 1].p2)
          setOppGameState(game.gameState[game.gameState.length - 1].p1)
          setCatsLeft(game.gameState[game.gameState.length - 1].p1ShipsSunk)
          setCatInfo(game.gameState[0].p2Cats)
          if (game.gameState[0].p1Cats){
            setOppCatInfo(game.gameState[0].p1Cats)
          }

        }
        setTurn(game.gameState[game.gameState.length - 1].turn);
        setGameId(game.id)
      }
    }
    refreshGame();
  }, []);

  //handle opponent leaving game early
  socket.on("opponentDisconnected", () => {
    setOpponentDisconnected(true);
  });

  const handleGameEnded = async () => {
    sessionStorage.clear();
    navigate('/')
    try {
     await fetch('api/game/endgame', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          winner: playerId,
          gameId
        })
      })

    } catch (error) {
      console.error("error updating the game's winner after opponent leaves", error)
    }
  }

  //both players call this when finishing their board: one will create the game,
  //while the second to finish will update the game with their board
  const fetchInitGameState = async (initialBoard) => {
    const room = sessionStorage.getItem("room");
    console.log("fetch", catInfo)
    try {
      //HAVE TO SORT OUT THIS LINK WITH PROXY
      const response = await fetch(`api/game/createGame`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          initialBoard,
          room,
          catInfo
        }),
      });

      const result = await response.json();
      //result is now {newgame, token}
      const game = result.newGame;
      const board = JSON.parse(game.gameState);
      const currentTurn = board[board.length - 1].turn;
      const myBoard = board[board.length - 1][playerId];
      setTurn(currentTurn);
      setMyGameState(myBoard);
      if (playerId === 'p1') {
        setCatInfo(board[0].p1Cats)
      } else {
        setCatInfo(board[0].p2Cats)
      }
      sessionStorage.setItem('gameToken', result.gameToken)
      setGameId(game.id);

      socket.emit("shareBoardAndTurn", board, currentTurn, room);
    } catch (error) {
      console.error("CANT GET YOUR GAME:", error);
    }
  };

  //page renders conditionally based on having a gameId,
  //whether their is a winner, etc.

  return (
    <>
      <div className='h1-battle-cats-cont'><img id='long-cat-logo' src={logoLong}></img></div>
      {gameId ? (
        winnerId === null ? (
          <>
            {
              opponentDisconnected &&
              <div>
                <p>your friend has left the game</p>
                <button className="disconnectButton" onClick={handleGameEnded}> go to homepage</button>
              </div>
            }

            <div id="message-container">
              {turn !== playerId ? (
                <span className="waiting-message">
                  waiting on your friend...
                </span>
              ) : (
                <span className="waiting-message">Your Turn!</span>
              )}
              {!msg ? (
                ""
              ) : msg && playerId === "p1" ? (
                <span className="sunk-ship-message">{msg.p1}</span>
              ) : (
                <span className="sunk-ship-message">{msg.p2}</span>
              )}
            </div>
            <div id="double-grid-container">
              <ChatBox playerId={playerId} />
              <OpponentShipMap
                oppGameState={oppGameState}
                setSelectedTile={setSelectedTile}
                selectedTile={selectedTile}
                turn={turn}
                playerId={playerId}
                catsLeft={catsLeft}
                oppCatInfo={oppCatInfo}
              />
              <div id="end-turn-btn-container">
                <EndTurnButton
                  selectedTile={selectedTile}
                  setSelectedTile={setSelectedTile}
                  setMsg={setMsg}
                  setWinnerId={setWinnerId}
                  gameId={gameId}
                  setTurn={setTurn}
                  setCatsLeft={setCatsLeft}
                  playerId={playerId}
                />
              </div>

              <PlayerShipMap
                myGameState={myGameState}
                catInfo={catInfo}
              />
            </div>
          </>
        ) : (
          <WinLoseScreen
            playerId={playerId}
            winnerId={winnerId}
          />
        )
      ) : (
        <SetBoard
          playerId={playerId}
          fetchInitGameState={fetchInitGameState}
          catInfo={catInfo}
          setCatInfo={setCatInfo}
        />
      )}
    </>
  );
};

export default GamePage;
