import { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import Nav from "../../Components/Nav";


const Login = ({setToken, setCurUser}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const submitHandler = async(e) => {
    e.preventDefault();
    try {
      const result = await fetch("/auth/login", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          username,
          password
        })
      });

      const json = await result.json();
      setCurUser(json)
     
      if (json.token) {
        localStorage.setItem('token', json.token);
        
        setToken(json.token);
        navigate("/me")
      
      }
     } catch (error) {
      console.status(401)
      
    }
  }

  return (
    <>
     <div>
      <Nav />
    <h1>The cats need you to identify yourself. Let them sniff fingertip below</h1>

    <form onSubmit={submitHandler}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => { setUsername(e.target.value) }}/>
      </label>
      <br />
      <label>
        Password:
        <input
        type="password"
        value={password}
        onChange={(e) => { setPassword(e.target.value)}}/>
        <br/>
        
          <input type="submit" value="let them sniff"/>
      </label>
    <label>
      don't have an account yet?
      <button>
        <Link to="/register">sign up right meow!</Link>
      </button>
    </label>
    </form>
  </div>
    
    </>

  )

}

export default Login;