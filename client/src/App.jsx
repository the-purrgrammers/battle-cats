import { useState, useEffect } from "react";
import { initializeSocket } from "./socket";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import GamePage from "./Pages/GamePage";
const socket = initializeSocket()

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/game" element={<GamePage />}></Route>
      </Routes>
    </>
  );
}

export default App;
