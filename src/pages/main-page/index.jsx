import { auth } from '../../firebaseconfig';
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Main() {
    let navigate = useNavigate();

    const logout = async () => {
        await signOut(auth);
    }

    function returnToLogin() {
        logout();
        navigate('/login');
    }

    return <div>
        <p> main </p>
        {auth.currentUser.email}
        <div className="submit-button">
            <button type='button' onClick={returnToLogin}>Log Out</button>
        </div>
    </div>
}

