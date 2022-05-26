import React from 'react';
import { useNavigate } from "react-router-dom";
import './style.css';

function Home() {
    let navigate = useNavigate();

    return <form>
        <div id='inner-home'>
            <div id='buttons-home'>
                <button className="home-button" onClick={() => {
                    navigate('/register');
                }}>Register</button>
                <button className="home-button" onClick={() => {
                    navigate('/login');
                }}>Login</button>
            </div>
            <div id='home-space'>
                <h1 id='home-title'>COMO DICE EL DICHO</h1>
                <h4 id='home-text'>Te recomendamos los mejores restaurantes en
                    zonas cercanas</h4>
            </div>
        </div>
    </form>
}

export default Home;