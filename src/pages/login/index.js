import React from 'react';
import { useNavigate, useParams, } from "react-router-dom";

function Login() {
  let navigate = useNavigate();

  return <form>
    <div className="form-Inner">
      <h2>LOGIN</h2>
      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input type="text" email="email" id="email"></input>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="text" password="password" id="password"></input>
      </div>
      <div className="submit-button">
        <button onClick={() => {
          navigate('/main-page');
        }}>Submit</button>
      </div>
    </div>
  </form>
}

export default Login;