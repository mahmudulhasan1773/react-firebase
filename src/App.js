import "./app.css";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
  const handleEmail = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
  };
  //password
  const handlePassword = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError(
        "errorCode is  auth/weak-password Firebase: Password should be at least 6 characters (auth/weak-password)."
      );
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        sendEmailVerification(auth.currentUser).then((result) => {
          console.log(result);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        // ..
      });
  };

  //signIn
  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };
  return (
    <div>
      <div>
        <span className="text-center text-danger"> The Error, {error}</span>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              required
              onBlur={handleEmail}
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
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              onBlur={handlePassword}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
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
      <button onClick={handlegithubAuth}>git hub register</button>
      <button onClick={handleSignOut}> signOut</button>
      <button onClick={handleSignIn}> signIn</button>
    </div>
  );
}

export default App;
