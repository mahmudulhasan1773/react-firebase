import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import firebaseApp from "./components/firebase/Firebase";
firebaseApp();
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();
// firebass app

function App() {
  const handleAuth = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        console.log(error);
        // ...
      });
  };
  return (
    <div>
      <button onClick={handleAuth}>click</button>
    </div>
  );
}

export default App;
