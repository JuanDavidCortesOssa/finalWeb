import React from 'react';
import { useState } from 'react';
import { useNavigate, } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebaseconfig';
import './style.css';

function Login() {

  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notRegisteredMessage, setNotRegisteredMessage] = useState("");

  const login = async (e) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user.email);
      navigate('/main-page')
    } catch (error) {
      console.log(error.message);
      setNotRegisteredMessage("User not found or invalid password");
    }
  }

  return <div id='login-page'>
    <form>
      <div id="form-inner">
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
        <button className="submit-button" type='button' onClick={login}>Submit</button>
        {notRegisteredMessage}
      </div>
    </form>
  </div>
}

export default Login;