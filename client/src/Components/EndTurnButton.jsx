import io from "socket.io-client";
const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";
const socket = io.connect(URL);


const EndTurnButton = ({ setWinnerId, selectedTile, setSelectedTile, setMsg, setCatsLeft, playerId }) => {

  const endTurn = async () => {
    try {
      setMsg('')
      const result = await fetch('api/game/endturn', {
        method: 'PUT',

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({

          selectedTile: selectedTile
        })
      }
      )
      const updatedGame = await result.json()
      updatedGame.gameState = JSON.parse(updatedGame.gameState)
      if(playerId === 'p1'){
        setCatsLeft(updatedGame.gameState[updatedGame.gameState.length - 1].p2ShipsSunk)
      }else if(playerId === 'p2'){
        setCatsLeft(updatedGame.gameState[updatedGame.gameState.length - 1].p1ShipsSunk)
      }
      
      socket.emit("shareNewTurn", updatedGame)
      if(updatedGame.msg){
        setMsg(updatedGame.msg)
      }
      if (updatedGame.winnerId) {
        setWinnerId(updatedGame.winnerId);
      }
      setSelectedTile('')
      console.log(`THIS IS THE UPDATED GAME`,updatedGame)

    } catch (error) {
      console.error("error fetching updated board", error);
    }
  };

  return (
    <>{selectedTile && <button onClick={endTurn}>PET THAT CAT!</button>}</>
  );
};

export default EndTurnButton;
