import { useEffect, useState } from "react";
import "../styles/catsLeft.css";

const CatsLeft = ({oppGameState, catsLeft}) => {

  const catsArray = [0,0,0,0,0]

  catsLeft.forEach((cat, index)=>{
    catsArray[index] = 1
  })

  return (
    <>
      <section className="catsLeftCont">
        <h3 className="catsLeftHeader">Cats Pet</h3>
        <span className="circleCont">
          {
            catsArray.map((cat, index)=>{
              if(cat){
                return <div key={index} className="catCircleSunk"></div>
              }else{
                return <div key={index} className="catCircle"></div>
              }
            })
          }
        </span>
      </section>
    </>
  );
};

export default CatsLeft;

//create another array of 5 0's, iterate through cat's sunk, 
//for every cat sunk change corresponding 0 to X, 
//map out new array to return a div, if the element is 0, give it the class 
//of catCircle, if it is X give it the class of catCircleSunk - red
//<div className="catCircle"></div>