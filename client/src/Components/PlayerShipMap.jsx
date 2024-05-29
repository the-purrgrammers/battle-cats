import { useState, useEffect } from "react";
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


const tileClasses = {
  A: "carrier",
  a: "carrier pet",
  B: "battleship",
  b: "battleship pet",
  C: "cruiser",
  c: "cruiser pet",
  D: "sub",
  d: "sub pet",
  E: "destroyer",
  e: "destroyer pet",
  0: "ocean",
  1: "miss",
};


const PlayerShipMap = ({ myGameState, catInfo }) => {
  if (!myGameState) {
    return <h2>loading...</h2>;
  }

  const petLetters = ["a","b","c","d","e"]

const getDirection = (type)=>{
  if(catInfo.length){
    let catType;
    catInfo.forEach(cat => {
      if (cat.type === type) {
        catType = cat
      }
    })
    if(catType.direction === 'vertical'){
      return catType.type
    }else{
      return `${catType.type}H`
    }
  }
  return ''
}

const catDirections = {
  A: getDirection("A"),
  B: getDirection("B"),
  C: getDirection("C"),
  D: getDirection("D"),
  E: getDirection("E")
}

  const getCatStyles = (type) => {
    if(catInfo.length){
      let catType;
      catInfo.forEach(cat => {
        if (cat.type === type) {
          catType = cat
        }
      })
      
      const catStyling = {
        position: 'absolute',
        top: `${catType.startRow * 50 + (catType.startRow*2)+2}px`,
        left: `${catType.startCol * 50 + (catType.startCol*2)+2}px`,
      };
      return catStyling
    }
    return ''
  }

  return (
    <>
      <div className="grid-container">
      
        <h2 className="map-h2s">your rug</h2>
        <div id="my-rug">
        <img src={imageSources[catDirections.A]} style={getCatStyles("A")} className="cat-image"/>
          <img src={imageSources[catDirections.B]} style={getCatStyles("B")} className="cat-image" />
          <img src={imageSources[catDirections.C]} style={getCatStyles("C")} className="cat-image" />
          <img src={imageSources[catDirections.D]} style={getCatStyles("D")} className="cat-image" />
          <img src={imageSources[catDirections.E]} style={getCatStyles("E")} className="cat-image" />
          {myGameState.map((gameRow, rowId) => (
            <div key={rowId} className="grid-row">
              {gameRow.map((gridItem, itemId) => (
                <div
                  key={`${rowId}${itemId}`}
                  className={`${tileClasses[gridItem]} ${petLetters.includes(gridItem) ? 'grid-item clear':  'grid-item'} 
                  ${petLetters.includes(gridItem) ? 'pet' : ''  }`}
                >
                  {petLetters.includes(gridItem) ? '👋' : ''  }
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlayerShipMap;
