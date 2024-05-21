const WinLoseScreen = ({ winnerId, playerId }) => {
  const playerIdNum = parseInt(playerId.slice(1));

  return (
    <>
      {winnerId === playerIdNum ? (
        <h1>The felines celebrate you {playerId}! You pet every last kitty!</h1>
      ) : (
        <h1>Go lick your petless paws {playerId}. Every kitten foiled your attempts.</h1>
      )
      }
    </>
  )
}

export default WinLoseScreen