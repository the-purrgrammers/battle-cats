import { useState } from "react";

const EndTurnButton = ({playerId, oppId}) => {

  const [playingPlayer, setPlayingPlayer] = ('p1');

  const handleClick = (e) => {
    e.preventDefault();
    setPlayingPlayer(oppId);
    console.log(playingPlayer);
  }

  return (
    <button onClick={(e)=>{handleClick}}>PET THAT CAT!</button>
  )
}

export default EndTurnButton;