import { useEffect } from 'react';
import '../styles/homepage.css'
import io from 'socket.io-client'
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';
const socket = io.connect(URL);

const HomeBody = () => {

const handleJoin=()=>{
  socket.emit("joinRoom", "gameRoom")
}

  return (
    <>
      <section className='homeMainSection'>
        <h1>Battle Cats!</h1>
        <button onClick={handleJoin}>Play Now</button>
      </section>
    </>
  );
};

export default HomeBody;
