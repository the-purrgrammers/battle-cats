import '../styles/homepage.css'
import { useNavigate, Link } from 'react-router-dom';

const Nav = () => {

  const navigate = useNavigate();

  return(
    <>
      <section className="navBar">
        <Link to={'/'}><button className="navBar-button">Home</button></Link>
        <Link to={'/register'}><button className="navBar-button">Register</button></Link>
        <Link to={'/login'}><button className="navBar-button">Login</button></Link>
      </section>
    </>
  )

};
  
export default Nav;
