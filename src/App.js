import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import { useState } from "react";
import firebaseApp from "./components/firebase/Firebase";
firebaseApp();
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();
const auth = getAuth();
// firebass app

function App() {
  const [users, setUsers] = useState({});
  const handleAuth = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUsers(user);

        // ...
      })
      .catch((error) => {
        console.log(error);
        // ...
      });
  };

  const handlegithubAuth = () => {
    signInWithPopup(auth, gitHubProvider)
      .then((result) => {
        const user = result.user;
        setUsers(user);

        // ...
      })
      .catch((error) => {
        console.log(error);
        // ...
      });
  };
  return (
    <div>
      <div> {users.email}</div>
      <button onClick={handleAuth}>click</button>
      <button onClick={handlegithubAuth}>click</button>
    </div>
  );
}

export default App;
