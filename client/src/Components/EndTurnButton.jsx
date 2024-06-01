import { initializeSocket } from "../socket";
const socket = initializeSocket()
const petAudio = new Audio("/src/assets/bcPET.mp3");
const missAudio = new Audio("/src/assets/bcMISS.mp3")

const EndTurnButton = ({ setWinnerId, selectedTile, setSelectedTile, setMsg, gameId, setTurn, setCatsLeft, playerId, curUser }) => {

  const endTurn = async () => {
    petAudio.play()
    try {
      setMsg('')
      const result = await fetch('api/game/endturn', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedTile,
          gameId,
          curUser
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
