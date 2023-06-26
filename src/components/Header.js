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

    function toggleMenu() {
        if (userInfo) {
            document.getElementById("burger1").classList.toggle('open')
        } else {
            document.getElementById("burger2").classList.toggle('open')
        }
    }

    const toggleMobileMenu = async () => {
        await toggleMenu();
    }


    return (
        <header>
            <Link to="/" className="logo">
                Auluma News
            </Link>

            {userInfo ? (
                <>
                    <div className={"hello"}>Olá, <b>{userInfo.name}</b></div>
                    <nav>
                        <Link to="/create">Criar novo post</Link>
                        <Link to="/user">Minha conta</Link>
                        <button className="logout" onClick={onLogout}>
                            Logout
                        </button>
                    </nav>
                    <div id={"burger1"} className={"hamburger-icon"} onClick={toggleMobileMenu}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                        <ul className="mobile-menu">
                            <p>Olá, <b>{userInfo.name}</b></p>
                            <a>
                                <button>
                                    <Link to="/create">Criar novo post</Link>
                                </button>
                            </a>
                            <a>
                                <button>
                                    <Link to="/user">Minha conta</Link>
                                </button>
                            </a>
                            <a>
                                <button className="logout" onClick={onLogout}>
                                    Logout
                                </button>
                            </a>
                        </ul>
                    </div>
                </>
            ) : (
                <>
                    <nav>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Registrar</Link>
                    </nav>
                    <div id={"burger2"} className={"hamburger-icon"} onClick={toggleMobileMenu}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                        <ul className="mobile-menu">
                            <a>
                                <button>
                                    <Link to="/login">Login</Link>
                                </button>
                            </a>
                            <a>
                                <button>
                                    <Link to="/register">Registrar</Link>
                                </button>
                            </a>
                        </ul>
                    </div>
                </>
            )}
        </header>
    );
}
