import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Register = ({setToken, setCurUser, token}) => {
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
      console.log(json)
      setCurUser(json)
      if (json.token) {
        sessionStorage.setItem('token', json.token);
        // setToken(sessionStorage.getItem('token'));
      }
      navigate("/me")
    } catch (error) {
      console.log("ERROR caught when signing up user.");
    }
  }
  return (
    <>
  <h1>REGISTER PAGE</h1>
  <h2>Create a new account or {<Link to="/login">log in</Link>}</h2>

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