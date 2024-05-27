import { useNavigate, Link } from "react-router-dom";

const WinLoseScreen = ({ winnerId, playerId }) => {
  const playerIdNum = parseInt(playerId.slice(1));
  const navigate = useNavigate();

  const clickHandler = () =>{
    localStorage.clear();
    navigate('/');
  }

  return (
    <>
      {winnerId === playerIdNum ? (
        <>
          <h1>The felines celebrate you {playerId}! You pet every last kitty!</h1>
          <button 
            className="returnButton"
            onClick={clickHandler}>Return to Home Page
          </button>
        </>
      ) : (
        <>
          <h1>Go lick your petless paws {playerId}. Every kitten foiled your attempts.</h1>
          <button
            className="returnButton"
            onClick={clickHandler}>Return to Home Page
          </button>
        </>
      )
      }
    </>
  )
}

export default WinLoseScreen