import { useEffect, useState } from "react";

const AccountPage = ({token, curUser}) => {
  const [user, setUser] = useState({})
  token = localStorage.getItem('token');
  if (!curUser.username) {
    curUser.username = "Sombody"
  if (!curUser.id) {
    curUser.id = "lost under the couch"
  }
  if (!curUser.message) {
    curUser.message = "someday you will find yourself. When you do, tell a cat about it."
  }
};
 useEffect(() => {
  const curToken = localStorage.getItem("token");
  if (curToken) {
    token = curToken;
  }
  if (curUser) {
    setUser(curUser);
  }
 }, [curUser]);

  return <>
    <h1>{curUser?.username}'s kitten palace</h1>
    <h3>all we want you to know is that {curUser.message}</h3>
    </>
}

export default AccountPage;