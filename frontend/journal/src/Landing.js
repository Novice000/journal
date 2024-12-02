import "./App.css"
import {useNavigate} from "react-router"

export default function Landingpage(){
    const navigate = useNavigate()

    function openJournal(){
       navigate("/entry")
    }

    return(
        <div>
            <h1>
                Your Journal
            </h1>
            <button onClick={openJournal}>
                Go In
            </button>
        </div>
    )
}