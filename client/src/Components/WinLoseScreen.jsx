const WinLoseScreen = ({ winnerId, playerId }) => {
  const playerIdNum = parseInt(playerId.slice(1));

  return (
    <>
    <div id='win-lose-msg-cont'>
      {winnerId === playerIdNum ? (
        <h1 id='winner-msg'>you won! the felines celebrate you! you pet every cat!</h1>
      ) : (
        <h1 id='loser-msg'>sorry, you lost. every kitten foiled your attempts. try again?</h1>
      )
      }
      </div>
    </>
  )
}

export default WinLoseScreen