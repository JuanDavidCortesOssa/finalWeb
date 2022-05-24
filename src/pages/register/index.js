import React, { useRef } from 'react';
import { useNavigate, useParams, } from "react-router-dom";
import { useAuth } from 'src/Context/AuthContext.js'

function Register() {
    const emailRef = useRef();
    const password1Ref = useRef();
    const password2Ref = useRef();
    const { signup } = useAuth();
    let navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        singup(emailRef.current.value, password1Ref.current.value)
    }

    return <form>
        <div className="form-Inner">
            <h2>LOGIN</h2>
            <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input type="text" email="email" id="email" ref={emailRef}></input>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="text" password="password" id="password" ref={password1Ref}></input>
            </div>
            <div className="form-group">
                <label htmlFor="password2">Password</label>
                <input type="text" password="password2" id="password2" ref={password2Ref}></input>
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