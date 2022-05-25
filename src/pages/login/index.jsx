import React from 'react';
import { useState } from 'react';
import { useNavigate, } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebaseconfig';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user.email);
      e.preventDefault();
    } catch (error) {
      console.log(error.message);
    }
  }

  function consoleDebug(e) {
    console.log("Hello");
  }

  let navigate = useNavigate();

  return <form>
    <div className="form-Inner">
      <h2>LOGIN</h2>
      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input type="text" email="email" id="email"
          onChange={(event => { setEmail(event.target.value) })}>
        </input>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="text" password="password" id="password"
          onChange={(event => { setPassword(event.target.value) })}>
        </input>
      </div>
      <div className="submit-button">
        <button type='button' onClick={login}>Submit</button>
      </div>
      <h4>
        {auth?.currentUser?.email ?? "No estoy Logeado"}
      </h4>
    </div>
  </form>
}

export default Login;