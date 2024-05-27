
import '../styles/homepage.css'
import { useNavigate, Link } from 'react-router-dom';

const Nav = () => {

  const navigate = useNavigate();

  return(
    <>
      <section className="navBar">
        <Link to={'/'}><button className="navBar-button">home</button></Link>
        <Link to={'/register'}><button className="navBar-button">register</button></Link>
        <Link to={'/login'}><button className="navBar-button">login</button></Link>
      </section>
    </>
  )

};
  
export default Nav;
