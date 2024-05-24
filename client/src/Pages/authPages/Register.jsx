import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Register = ({setToken, setCurUser}) => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const navigate = useNavigate();

  const signUpHandler = async(e) => {
    e.preventDefault()
    try {
      const result = await fetch("/auth/register", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: inputUsername,
          password: inputPassword
        })
      });
      const json = await result.json();
      setCurUser(json)
      if (json.token) {
        localStorage.setItem('token', json.token);
        setToken(json.token)
        navigate("/me")
      }
    } catch (error) {
      console.log("ERROR caught when signing up user.");
    }
  }
  return (
    <>
  <h1>register page</h1>
  <h2>create a new account or {<Link to="/login">log in</Link>}</h2>
  <form onSubmit={signUpHandler}>
    <label>
      username:
      <input required
      type="text"
      value={inputUsername}
      onChange={(e) => setInputUsername(e.target.value)}/>
    </label>
    <br />
    <label>
      password:
      <input required
      type="password"
      value={inputPassword}
      onChange={(e) => setInputPassword(e.target.value)}
      />
    </label>
    <button>register</button>
  </form>
  
  </>
    
  )
  
}

export default Register;