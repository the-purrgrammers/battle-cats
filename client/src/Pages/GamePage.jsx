import EndTurnButton from "../Components/EndTurnButton"
import OpponentShipMap from "../Components/OpponentShipMap"
import PlayerShipMap from "../Components/PlayerShipMap"

const GamePage = () => {
  return (
    <>
      <h1>Game Page</h1>
      <OpponentShipMap />
      <EndTurnButton />
      <PlayerShipMap />
    </>
  )

}

export default GamePage