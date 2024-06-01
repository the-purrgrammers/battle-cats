import HomeBody from "../Components/HomeBody";
import  React, { useEffect } from 'react';
import Footer from "../Components/Footer";
import "../styles/homepage.css";



const HomePage = () => {
  const waitingForAudio = new Audio("./src/assets/waitingForBC.mp3")
  useEffect(() => {
    const playAudio = async () => {
      try {
        await waitingForAudio.play();
      } catch (err) {
        console.error("Failed to play audio:", err);
      }
    };

    playAudio();

    return () => {
      waitingForAudio.pause();
      waitingForAudio.currentTime = 0;
    };
  }, [waitingForAudio]);
    


  return (
    <>
      <div className="homeWrapper">
        {/* <Nav curUser={curUser}/> */}
        <HomeBody />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
