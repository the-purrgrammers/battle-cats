import { useNavigate, Link } from "react-router-dom";

const WinLoseScreen = ({ winnerId, playerId }) => {
  const playerIdNum = parseInt(playerId.slice(1));
  const navigate = useNavigate();

  const clickHandler = () =>{
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  }

  return (
    <>
      {winnerId === playerIdNum ? (
        <div id="win-lose-msg-cont">
          <h1 id="winner-msg">
            you won! the felines celebrate you! you pet every cat!
          </h1>
          <button 
            className="returnButton"
            onClick={clickHandler}>Return to Home Page
          </button>
        </div>
      ) : (
        <div id="win-lose-msg-cont">
          <h1 id="loser-msg">
            sorry, you lost. every kitten foiled your attempts. try again?
          </h1>
          <button
            className="returnButton"
            onClick={clickHandler}>Return to Home Page
          </button>
        </div>
      )
      }
    </>
  );
};

export default WinLoseScreen;
