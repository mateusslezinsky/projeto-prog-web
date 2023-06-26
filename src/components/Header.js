import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../UserContext";

import {auth} from "../firebase/firebase.utils";
import {signOut} from "firebase/auth";

export default function Header() {
    const {userInfo, setUserInfo} = useContext(UserContext);

    const navigate = useNavigate();
    const onLogout = async () => {
        try {
            await signOut(auth);
            setUserInfo(null);
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <header>
            <Link to="/" className="logo">
                Auluma News
            </Link>

            {userInfo ? (
                <>
                    <div>
                        <nav>
                            <div className={"center hidden-navbar-item"}>Olá, <b>{userInfo.name}</b></div>
                            <Link className={"hidden-navbar-item"} to="/create">Criar novo post</Link>
                            <Link className={"hidden-navbar-item"} to="/user">Minha conta</Link>
                            <button className="logout" onClick={onLogout}>
                                Logout
                            </button>
                        </nav>
                    </div>
                </>
            ) : (
                <nav>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Registrar</Link>
                </nav>
            )}
        </header>
    );
}
