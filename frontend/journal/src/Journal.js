import React, {useEffect, useState} from "react";
import { getUser } from "./utils/helper";
import { Link, useNavigate} from "react-router"
import Error from "./Error";

export default function Journal({ children }) {
    const [user, setUser] = useState({username:"", email:""})
    const navigate = useNavigate()
    
    useEffect(() => {
        async function fetchUser() {
        try {
            const response = await getUser();
            if (response.status !== 200){
               throw new Error("Unable to fetch user")
            }
            const currentUser = response.data
            if (currentUser) {
              setUser(currentUser);
            }
          } catch (e) {
          return ( <Error error={e} />)
          }
    }; fetchUser()
        }
      , [navigate]);
    

    function handleLogOut(){
        localStorage.removeItem("ACCESS_TOKEN")
        localStorage.removeItem("REFRESH_TOKEN")
        navigate("/login")
    }
    
    
    return (
        <div className="journal">
            <div className="user-info" >
                <h2>{user?.username}'s Journal</h2>
                <p>{user?.email}</p>
            </div>
            <div className="navigation">
                <nav>
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item">
                           <Link className="nav-link" to="/"> Home </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/entries">My Entries</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/entry">Write</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Create New Account</Link>
                        </li>
                        <li className="nav-item">
                            <button onClick={handleLogOut}>
                                Log Out
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* navigation for mobile  */}
            <div className="navigation-mobile">
                <nav>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                           <Link className="nav-link" to="/"> Home </Link>
                        </li>
                        <li className="nav-item dropdown">
                        <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown"  role="button" aria-expanded="false">Dropdown</span>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="/entries">My Entries</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/entry">Write</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/register">Create New Account</Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <button onClick={handleLogOut}>
                                Log Out
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="children-container">
                {children}
            </div>
        </div>
    )
}