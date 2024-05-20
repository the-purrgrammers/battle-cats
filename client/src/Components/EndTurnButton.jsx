import io from "socket.io-client";
const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";
const socket = io.connect(URL);

const EndTurnButton = ({ selectedTile, setSelectedTile, setMsg }) => {
  const endTurn = async () => {
    try {
      setMsg("");
      const result = await fetch("http://localhost:3000/game/endturn", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedTile: selectedTile,
        }),
      });
      const updatedGame = await result.json();
      updatedGame.gameState = JSON.parse(updatedGame.gameState);
      console.log(updatedGame);
      socket.emit("shareNewTurn", updatedGame);
      if (updatedGame.msg) {
        setMsg(updatedGame.msg);
      }
      setSelectedTile("");
    } catch (error) {
      console.error("error fetching updated board", error);
    }
  };

  return (
    <>{selectedTile && <button onClick={endTurn}>PET THAT CAT!</button>}</>
  );
};

export default EndTurnButton;
