import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import GamePage from "./Pages/GamePage";
import AccountPage from "./Pages/AccountPage";
import Login from "./Pages/authPages/Login";
import Register from "./Pages/authPages/Register";
import Nav from "./Components/Nav";



function App() {
  const [token, setToken] = useState("");
  const [curUser, setCurUser] = useState({});
  const[oppUser, setOppUser] = useState({});
  
  console.log(curUser, "in app.jsx")
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage token={token} curUser={curUser}/>}></Route>
        <Route path="/game" element={<GamePage token={token} curUser={curUser}/>}></Route>
        <Route path="/me/:id" element={<AccountPage token={token} curUser={curUser}/>}></Route>
        <Route path="/login" element={<Login setToken={setToken} setCurUser={setCurUser} token={token}/>}></Route>
        <Route path="/register" element={<Register setToken={setToken} setCurUser={setCurUser} token={token}/>}></Route>
      </Routes>
      </>
  );
}

export default App;
