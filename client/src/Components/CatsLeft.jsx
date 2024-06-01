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