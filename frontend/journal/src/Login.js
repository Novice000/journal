import { useState } from "react"
import { cred } from "./utils/config"
import {useNavigate} from "react-router"
import Error from "./Error"
import { HashLoader } from "react-spinners"


export default function  LogIn(){
   const [formData, setFormData] = useState({})
   const navigate = useNavigate()
   const [loading, setLoading] = useState(false)

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
        setLoading(true)
        try{
            const response = await cred.post("/login/", formData)
            if(response.status !== 200 && response !== 201){
                throw new Error("Requet failed!")
               
            } else if(response.status === 401 || response.status === 403){
                alert("user doesn't exit")
            }
            const {access, refresh} = response.data
            localStorage.removeItem("ACCESS_TOKEN")
            localStorage.setItem("ACCESS_TOKEN", access)
            localStorage.removeItem("REFRESH_TOKEN")
            localStorage.setItem("REFRESH_TOKEN", refresh)
            setLoading(false)
            navigate("/entry")
        }
        catch(error){
            setLoading(false)
            return (<Error error={error} />)
        }
    }

    if (loading) {
        return (
          <div className="loader-container">
            <HashLoader loading={loading} color="#3e2723" size={20} />
          </div>
        );
      }

    return (
        <div className="auth-container">
            <div class="auth-elements">
                <form onSubmit={handleSubmit}>
                    <div>
                        <p>Log In</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username"
                        className="form-label">
                            username:
                        </label>
                        <input
                        name="username"
                        className="form-control"
                        value= {formData.username}
                        onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"
                        className="form-label">
                            password:
                        </label>
                        <input name="password"
                        type="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}/>
                    </div>
                    <div className="auth-submit mb-3">
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
        </div>
    )
}