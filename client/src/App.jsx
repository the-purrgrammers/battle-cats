import { useState, useEffect } from "react";
//io import and socket connection
import io from "socket.io-client";
const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";
const socket = io.connect(URL);
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import GamePage from "./Pages/GamePage";
import AccountPage from "./Pages/AccountPage";
import Login from "./Pages/authPages/Login";
import Register from "./Pages/authPages/Register";

function App() {
  const [token, setToken] = useState("");
  const [curUser, setCurUser] = useState({});

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/game" element={<GamePage />}></Route>
        <Route path="/me" element={<AccountPage token={token} curUser={curUser}/>}></Route>
        <Route path="/login" element={<Login setToken={setToken} setCurUser={setCurUser}/>}></Route>
        <Route path="/register" element={<Register setToken={setToken} setCurUser={setCurUser}/>}></Route>
      </Routes>
    </>
  );
}

export default App;
