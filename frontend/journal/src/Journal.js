import React, {useEffect, useState} from "react";
import { isAccessTokenExpired, isRefreshTokenExpired, refreshToken, getUser } from "./utils/helper";
import { Link, useNavigate} from "react-router"

export default function Journal({ children }) {
    const [user, setUSer] = useState({})

    const navigate = useNavigate()
    useEffect(() => {
        if (isAccessTokenExpired() && !isRefreshTokenExpired()) {
            refreshToken();
        } else if (isAccessTokenExpired() && isRefreshTokenExpired()) {
            navigate("/login");
        } else {
            const currentUser = getUser();
            if (JSON.stringify(user) !== JSON.stringify(currentUser)) {
                setUSer(currentUser);
            }
        }
    }, [navigate, user]);
    

    function handleLogOut(){
        localStorage.removeItem("ACCESS_TOKEN")
        localStorage.removeItem("REFRESH_TOKEN")
        navigate("/login")
    }
    
    
    return (
        <div>
            <div >
                <h2>{user.username}'s Journal</h2>
                <p>{user.email}</p>
            </div>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/entries">My Entries</Link>
                        </li>
                        <li>
                            <Link to="/entry">Write</Link>
                        </li>
                        <li>
                            <Link to="/register">Create New Account</Link>
                        </li>
                        <li>
                            <button onClick={handleLogOut}>
                                Log Out
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}