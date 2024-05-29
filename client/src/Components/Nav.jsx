import '../styles/homepage.css'
import { Link } from 'react-router-dom';

const Nav = ({curUser}) => {
console.log(curUser)
const token = sessionStorage.getItem("token");
const clickHandler = () =>{
  sessionStorage.removeItem('token');
  window.location.reload();
}

  return(
    <>
      <section className="navBar">
        {token && curUser?.id ? 
        (<>
        <Link to={'/'}><button className="navBar-button">home</button></Link>
        <Link to={`/me/${curUser.id}`}><button className="navBar-button">My Profile</button></Link>
        <Link to={'/'}><button className="navBar-button" onClick={clickHandler}>Log Out</button></Link>
        </>
        ) : ( <>
        <Link to={'/'}><button className="navBar-button">home</button></Link>
        <Link to={'/register'}><button className="navBar-button">register</button></Link>
        <Link to={'/login'}><button className="navBar-button">login</button></Link>
        </>)
        }
      </section>
    </>
  )

};
  
export default Nav;
