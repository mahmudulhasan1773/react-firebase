import "./app.css";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
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
        const gitUser = result.user;
        setUsers(gitUser);

        console.log(gitUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUsers({});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //email
  const handleEmail = () => {
    console.log("email");
  };
  //password
  const handlePassword = () => {
    console.log("password");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("form click");
  };
  return (
    <div>
      <div>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              onChange={handleEmail}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              onChange={handlePassword}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <div>-----------------------------</div>
      <div> {users.email}</div>
      <div>
        {" "}
        i am from github: <img src={users.photoURL} alt="i" />
      </div>

      <button onClick={handleAuth}>click</button>
      <button onClick={handlegithubAuth}>click</button>
      <button onClick={handleSignOut}> signOut</button>
    </div>
  );
}

export default App;
