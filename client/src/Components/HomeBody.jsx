import { useNavigate } from "react-router-dom";

const HomeBody = () => {
  const navigate = useNavigate();

  return (
    <>
      <section className="homeMainSection">
        <h1>Battle Cats!</h1>
        <button
          onClick={() => {
            navigate("/game");
          }}
        >
          Play Now
        </button>
      </section>
    </>
  );
};

export default HomeBody;
