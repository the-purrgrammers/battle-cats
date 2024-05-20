/* eslint-disable no-useless-catch */
const EndTurnButton = ({selectedGridItem, selectedTile, setSelectedTile, turn, playerId}) => {
  console.log(playerId);
  const handleClick = async () => {
    
    try{
       const result = await fetch('http://localhost:3000/game/endturn', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          selectedTile: selectedTile
        })
    })
    const updatedGame = await result.json();
    updatedGame.gameState = JSON.parse(updatedGame.gameState);
    console.log(updatedGame);
    }catch(error){
      throw(error);
    }

    if (typeof selectedGridItem !== "number" && selectedGridItem === selectedGridItem.toUpperCase()) {
      alert(`HIT`)
    } else {
      alert(`MISS`)
    }

  }
  
  return (
    <>
    {
      selectedTile && 
      <button onClick={handleClick}>PET THAT CAT!</button>
    }
    </>
  )
}

export default EndTurnButton;