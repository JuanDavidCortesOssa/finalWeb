import React from 'react';
import { useNavigate, useParams, } from "react-router-dom";

function Home() {
    let navigate = useNavigate();

    return <form>
        <div className="home-buttons">
            <div className="home-button">
                <button onClick={() => {
                    navigate('/register');
                }}>Register</button>
            </div>
            <div className="home-button">
                <button onClick={() => {
                    navigate('/login');
                }}>Login</button>
            </div>
        </div>
    </form>
}

export default Home;