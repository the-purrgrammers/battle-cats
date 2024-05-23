import io from "socket.io-client";

const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";
let socket;

export const initializeSocket = () => {
  if (!socket) {
    socket = io.connect(URL);
    sessionStorage.setItem("socketInitialized", "true");
  }
  return socket;
};

export const getSocket = () => {
  if (!socket && sessionStorage.getItem("socketInitialized")) {
    socket = io.connect(URL);
  }
  return socket;
};