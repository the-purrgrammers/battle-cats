import HomeBody from "../Components/HomeBody";
import Footer from "../Components/Footer";
import "../styles/homepage.css";

const HomePage = () => {
  return (
    <>
      <div className="homeWrapper">
        <HomeBody />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
