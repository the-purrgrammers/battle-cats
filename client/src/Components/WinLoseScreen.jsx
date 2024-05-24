const WinLoseScreen = ({ winnerId, playerId }) => {
  const playerIdNum = parseInt(playerId.slice(1));

  return (
    <>
      {winnerId === playerIdNum ? (
        <h1>you won! the felines celebrate you! you pet every cat!</h1>
      ) : (
        <h1>sorry, you lost. every kitten foiled your attempts. try again?</h1>
      )
      }
    </>
  )
}

export default WinLoseScreen