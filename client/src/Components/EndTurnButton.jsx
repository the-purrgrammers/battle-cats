import { initializeSocket } from "../socket";
const socket = initializeSocket()

const EndTurnButton = ({ setWinnerId, selectedTile, setSelectedTile, setMsg, gameId, setTurn }) => {
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
      const newTurn = updatedGame.gameState[updatedGame.gameState.length-1].turn
      setTurn(newTurn)
      setSelectedTile('')
    } catch (error) {
      console.error("error fetching updated board", error);
    }
  };

  return (
    <>{selectedTile && <button onClick={endTurn}>PET THAT CAT!</button>}</>
  );
};

export default EndTurnButton;
