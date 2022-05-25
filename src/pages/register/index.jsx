import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../../firebaseconfig';

function Register() {

    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");

    // const [user, setUser] = useState({});

    // onAuthStateChanged(auth, (currentUser) => {
    //     setUser(currentUser);
    // })

    function validatePassword() {
        var isValid = false;
        if (password1 == password2) {
            isValid = true;
        }
        return isValid;
    }

    const register = async () => {
        try {

            if (validatePassword()) {
                const user = await createUserWithEmailAndPassword(auth, email, password1);
                console.log("termino de registrar: ", user);
            } else {
                setPasswordMessage("Password does not coincide");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async () => {
        await signOut(auth);
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
                    onChange={(event => { setPassword1(event.target.value) })}>
                </input>
            </div>
            <div className="form-group">
                <label htmlFor="password2">Password</label>
                <input type="text" password="password2" id="password2"
                    onChange={(event => { setPassword2(event.target.value) })}>
                </input>
            </div>
            <div className="submit-button">
                <button type='button' onClick={register}>Submit</button>
            </div>
            <h4>User Logged in: </h4>
            {passwordMessage}

        </div>
    </form>
}

export default Register;