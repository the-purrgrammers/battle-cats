import { useState } from "react";

const EndTurnButton = ({oppId, playerId, selectedTile}) => {

  const [currentPlayer, setCurrentPlayer] = useState('');
  
  const handleClick = (e) => {
    e.preventDefault();
    setCurrentPlayer(playerId);
  }

  return (
    <button onClick={handleClick}>PET THAT CAT!</button>
  )
}

export default EndTurnButton;


// find out the location of the selected square
// set off the chain of events that calls the db function call to update
//I'm player one and I clicked on oppBoard[i][j];
// go to the endpoint that will call the function necessary for updating the db

// selected tile needs to be put into a body and sent via put 