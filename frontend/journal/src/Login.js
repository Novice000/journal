import { useState } from "react"
import { cred } from "./utils/config"
import {useNavigate} from "react-router"


export default function  LogIn(){
   const [formData, setFormData] = useState({})
   const navigate = useNavigate()

    function handleChange(e){
        const {name, value} = e.target
        setFormData((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    function handleRegister(){
        navigate("/register")
    }

    async function handleSubmit(e){
        e.preventDefault()
        try{
            const response = await cred.post("/login/", formData)
            if(response.status !== 200){
                throw new Error("Requet failed!")
            }
            const {access, refresh} = response.data
            localStorage.setItem("ACCESS_TOKEN", access)
            localStorage.setItem("REFRESH_TOKEN", refresh)
            navigate("/entry")
        }
        catch(error){
            alert("Error:", error)
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">
                        username:
                    </label>
                    <input 
                    name="username"
                    value= {formData.username}
                    onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="password">
                        password:
                    </label>
                    <input name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}/>
                </div>
                <div>
                    <button
                    type="submit">
                        Log In
                    </button>
                </div>
            </form>

            <button onClick={handleRegister}>
                Register
            </button>
        </div>
    )
}