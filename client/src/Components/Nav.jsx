import '../styles/homepage.css'
import { useNavigate, Link } from 'react-router-dom';

const Nav = () => {

  const navigate = useNavigate();

  return(
    <>
      <section className="navBar">
        <Link to={'/'}><button className="navButton">Home</button></Link>
        <Link to={'/register'}><button className="navButton">Register</button></Link>
        <Link to={'/login'}><button className="navButton">Login</button></Link>
      </section>
    </>
  )

};
  
export default Nav;
