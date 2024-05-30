import HomeBody from "../Components/HomeBody";
import Footer from "../Components/Footer";
import Nav from "../Components/Nav";
import "../styles/homepage.css";

const HomePage = () => {

  return (
    <>
      <div className="homeWrapper">
        <Nav />
        <HomeBody />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;