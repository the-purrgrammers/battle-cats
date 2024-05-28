import "../styles/oppGame.css";
import CatsLeft from "./CatsLeft";

const OpponentShipMap = ({
  oppGameState,
  setSelectedTile,
  selectedTile,
  turn,
  playerId,
  catsLeft,
}) => {
  const hitShips = ["a", "b", "c", "d", "e"];
  if (!oppGameState) {
    return <h2>loading...</h2>;
  }

  //NOTE: SORT OUT KEY PROPS WHEN THERE ARE ID's COMING IN
  return (
    <>
      {oppGameState.length === 0 ? (
        <div className="waitDiv">You're waiting for your friends' cats to find a comfy place to nap</div>
      ) : (
        <div className="grid-container">
          <h2 class="map-h2s">your friend's rug</h2>
          <div id="opp-rug">
            {oppGameState.map((gameRow, rowId) => (
              <div key={rowId} className="grid-row">
                {gameRow.map((gridItem, itemId) => (
                  <div
                    key={`${rowId}${itemId}`}
                    id={`${rowId}${itemId}`}
                    className={
                      `${rowId}${itemId}` === selectedTile
                        ? "selected-grid-item"
                        : hitShips.includes(gridItem)
                          ? "grid-item hit"
                          : gridItem === 1
                            ? "grid-item miss"
                            : "grid-item"
                    }
                    onClick={(e) => {
                      if (turn === playerId) {
                        setSelectedTile(e.target.id);
                      }
                    }}
                  ></div>
                ))}
              </div>
            ))}
          </div>
          <CatsLeft
            oppGameState={oppGameState}
            playerId={playerId}
            catsLeft={catsLeft}
          />
        </div>
      )}
    </>
  );
};



export default OpponentShipMap;
