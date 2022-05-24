import React from 'react';
import { useNavigate, useParams, } from "react-router-dom";

function Register() {
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
            <div className="form-group">
                <label htmlFor="password2">Password</label>
                <input type="text" password="password2" id="password2"></input>
            </div>
            <div className="submit-button">
                <button onClick={() => {
                    navigate('/login');
                }}>Submit</button>
            </div>
        </div>
    </form>
}

export default Register;