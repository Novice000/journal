import "./styles/App.css"
import {useNavigate} from "react-router"

export default function Landingpage(){
    const navigate = useNavigate()

    function openJournal(){
       navigate("/entry")
    }

    return(
        <div className="landing-container">
            <h1 className="go-heading">
                    Want To Write?
                </h1>
            <div className="landing-elements">
                <button className="go-in" onClick={openJournal}>
                    Go Ahead
                </button>
            </div>
        </div>
    )
}