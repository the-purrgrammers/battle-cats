import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AccountPage = ({curUser}) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const { id: userId } = useParams();

  const fetchUser = async () => {
    try {
      const response = await fetch(`/auth/me/${userId}`);
      const json = await response.json();
      setLoggedInUser(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const runFetch = async () => {
      await fetchUser();
    };
    runFetch();
  }, []);

  return (
    <>
      {loggedInUser ? (
        <>
          <h1>{loggedInUser.username}</h1>
          <h2>Games won: {loggedInUser.gamesAsWinner.length}</h2>
          <h2>Games lost: {loggedInUser.gamesAsLoser.length}</h2>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default AccountPage;
