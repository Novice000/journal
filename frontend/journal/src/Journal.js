import React, {useEffect, useState} from "react";
import { getUser } from "./utils/helper";
import { Link, useNavigate} from "react-router"

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
            console.error("Error fetching user:", e);
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
        <div>
            <div >
                <h2>{user.username}'s Journal</h2>
                <p>{user.email}</p>
            </div>
            <div>
                <nav>
                    <ul>
                        <li>
                           <Link to="/"> Home </Link>
                        </li>
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