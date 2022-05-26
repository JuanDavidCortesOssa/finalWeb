import React from 'react';
import { useState } from 'react';
import { useNavigate, } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebaseconfig';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import { setTrue } from '../../userSlice';

function Login() {
  let navigate = useNavigate();

  const isLogged = useSelector((state) => state.isLogged.value);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notRegisteredMessage, setNotRegisteredMessage] = useState("");

  const setLocalStorage = value => {
    try {
      window.localStorage.setItem("Logged", value);
    } catch (e) {
      console.log(e);
    }
  }

  const login = async (e) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user.email);
      dispatch(setTrue());
      setLocalStorage(true);
      navigate('/main-page')
    } catch (error) {
      console.log(error.message);
      setNotRegisteredMessage("User not found or invalid password");
    }
  }

  return <div id='login-page'>
    <form>
      <div className="form-inner">
        <h2 id='login-text'>LOGIN</h2>
        <div className="form-group">
          <input className='form-input' placeholder="E-mail" type="text" email="email" id="email"
            onChange={(event => { setEmail(event.target.value) })}>
          </input>
        </div>
        <div className="form-group">
          <input className='form-input' placeholder="password" type="text" password="password" id="password"
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