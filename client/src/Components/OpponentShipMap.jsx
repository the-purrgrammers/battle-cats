import "../styles/oppGame.css";
import A from '../assets/5block.png'
import B from '../assets/4block.png'
import C from '../assets/3block.png'
import D from '../assets/3block.png'
import E from '../assets/2block.png'
import AH from '../assets/5blockhorz.png'
import BH from '../assets/4blockhorz.png'
import CH from '../assets/3blockhorz.png'
import DH from '../assets/3blockhorz.png'
import EH from '../assets/2blockhorz.png'
import CatsLeft from "./CatsLeft";



const imageSources = {
  A: A,
  AH: AH,
  B: B,
  BH: BH,
  C: C,
  CH: CH,
  D: D,
  DH: DH,
  E: E,
  EH: EH,
};

const OpponentShipMap = ({
  oppGameState,
  setSelectedTile,
  selectedTile,
  turn,
  playerId,
  catsLeft,
  oppCatInfo
}) => {

console.log(catsLeft)
const getDirection = (type)=>{
  if(oppCatInfo.length){
    let catType;
    oppCatInfo.forEach(cat => {
      if (cat.type === type) {
        catType = cat
      }
    })
    if(catType.direction === 'vertical'){
      return catType.type
    }else{
      return `${catType.type}H`
    }
  }else{
    return ''
  }

}


const catDirections = {
  A: getDirection("A"),
  B: getDirection("B"),
  C: getDirection("C"),
  D: getDirection("D"),
  E: getDirection("E")
}

  const getCatStyles = (type) => {
    if(oppCatInfo.length){
      let catType;
      oppCatInfo.forEach(cat => {
        if (cat.type === type) {
          catType = cat
        }
      })
      const catStyling = {
        position: 'absolute',
        display: catsLeft.includes(type) ? 'block' :  'none', // if uppercase letter of this letter is in the catsLeft then give x class
        top: `${catType.startRow * 50 + (catType.startRow*2)+2}px`,
        left: `${catType.startCol * 50 + (catType.startCol*2)+2}px`,
      };
      return catStyling
    }else{
      return {display: 'none'}
    }
   
  }

  const hitShips = ["a", "b", "c", "d", "e"];
  if (!oppGameState) {
    return <h2>loading...</h2>;
  }

  //NOTE: SORT OUT KEY PROPS WHEN THERE ARE ID's COMING IN
  return (
    <>
      {oppGameState.length === 0 ? (
        <h3 className="waitH3">you're waiting for your friend's cats to find a comfy place to nap</h3>
      ) : (
        <div className="grid-container">
          <h2 className="map-h2s">your friend's rug</h2>
          <div id="opp-rug">
          <img src={imageSources[catDirections.A]} style={getCatStyles("A")} className="cat-image" />
          <img src={imageSources[catDirections.B]} style={getCatStyles("B")} className="cat-image" />
          <img src={imageSources[catDirections.C]} style={getCatStyles("C")} className="cat-image" />
          <img src={imageSources[catDirections.D]} style={getCatStyles("D")} className="cat-image" />
          <img src={imageSources[catDirections.E]} style={getCatStyles("E")} className="cat-image" />
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
                      ? catsLeft.includes(gridItem.toUpperCase())
                      ? "grid-item clear"
                      : "grid-item hit"
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
