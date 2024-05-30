import { useState } from "react";
import {Link, useNavigate} from "react-router-dom"


const Login = ({setCurUser}) => {
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
     console.log(json);
     const id = json.id;
      if (json.token) {
        sessionStorage.setItem('token', json.token);
        navigate(`/me/${id}`);
        console.log(id);
      
      }
     } catch (error) {
      console.status(401)
      
    }
  }

  return (
    <>
     <div>

      <Nav />
      <div className="homeMainSection">
      <h1 className="loginh1">The cats need you to identify yourself. Let them sniff fingertip below</h1>
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
        
          <input className="sniffButton" type="submit" value="let them sniff"/>
      </label>
    <label className="regLabel">
      don't have an account yet?
      <button className="sniffButton" onClick={()=> {
        navigate('/register')
      }}>
        sign up meow!
      </button>
    </label>
    </form>
</div>

  </div>
    
    </>

  )

}

export default Login;