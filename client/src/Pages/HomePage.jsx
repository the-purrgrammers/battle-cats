import HomeBody from "../Components/HomeBody";
import Footer from "../Components/Footer";
import "../styles/homepage.css";
import { useEffect } from "react";

const HomePage = () => {

//TAKE THIS OUT IF IT DOESN'T WORK!!!!
useEffect(()=>{
  sessionStorage.clear()
  },[])
  //TAKE THIS OUT IF IT DOESN'T WORK!!!!
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