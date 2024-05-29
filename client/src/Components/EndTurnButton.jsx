import { initializeSocket } from "../socket";
const socket = initializeSocket()

const EndTurnButton = ({ setWinnerId, selectedTile, setSelectedTile, setMsg, gameId, setTurn, setCatsLeft, playerId}) => {
  const endTurn = async () => {
    try {
      setMsg('')
      const result = await fetch('api/game/endturn', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedTile,
          gameId
        })
      }
      )
      const updatedGame = await result.json()
      updatedGame.gameState = JSON.parse(updatedGame.gameState)
      const room = sessionStorage.getItem("room")
      socket.emit("shareNewTurn", updatedGame, room)
      if (updatedGame.msg) {
            setMsg(updatedGame.msg)
      }
       if (updatedGame.winnerId) {
        setWinnerId(updatedGame.winnerId);
      }
      if(playerId === 'p1'){
        setCatsLeft(updatedGame.gameState[updatedGame.gameState.length - 1].p2ShipsSunk)
        // setCatInfo(updatedGame.gameState[0].p1Cats)  
      }else if(playerId === 'p2'){
        setCatsLeft(updatedGame.gameState[updatedGame.gameState.length - 1].p1ShipsSunk)
        // setCatInfo(updatedGame.gameState[0].p2Cats)
      }

      const newTurn = updatedGame.gameState[updatedGame.gameState.length-1].turn
      setTurn(newTurn)
      setSelectedTile('')
    } catch (error) {
      console.error("error fetching updated board", error);
    }
  };

  return (
    <>{selectedTile && <button id='end-turn-btn' onClick={endTurn}>pet that cat!</button>}</>
  );
};

export default EndTurnButton;
