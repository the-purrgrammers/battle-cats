import { useState, useEffect } from "react";
//io import and socket connection
import io from "socket.io-client";
const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";
const socket = io.connect(URL);
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import GamePage from "./Pages/GamePage";

function App() {
  const [isHomePage, setIsHomePage] = useState(true);

  return (
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/game" element={<GamePage />}></Route>
      </Routes>
  );
}

export default App;