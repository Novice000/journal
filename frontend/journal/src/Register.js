import { useState } from "react"
import axiosInstance from "./utils/config"
import {useNavigate} from "react-router"
import Error from "./Error"
import { HashLoader } from "react-spinners"

export default function  Register(){
   const [formData, setFormData] = useState({})
   const [message, setMessage] = useState("")
   const [loading, setLoading] = useState(false)

   const navigate = useNavigate()

   function handleRegister(){
    navigate("/login")
    }
   function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));

  }

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        if (formData.password !== formData.confirmPassword){
            setMessage("Passwords don't Match")
            return
        }

        setMessage("")
        try{
            const response = await axiosInstance.post("/register/", {
                username:formData.username,
                password: formData.password,
                email: formData.email
            })
            if(response.status !== 201){
               throw new Error("Could not create account. Try Again!")
            }
                setLoading(false)
                navigate("/login")
        }
        catch(error){
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
                        <label htmlFor="email"
                        className="form-label">
                            email:
                        </label>
                        <input
                        id="email"
                        name="email"
                        className="form-control"
                        value= {formData.email}
                        onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"
                        className="form-label">
                            password:
                        </label>
                        <input name="password"
                        type="password"
                        id="passoword"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}/>
                        <p>{ message }</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirm-password"
                        className="form-label">
                           Confirm password:
                        </label>
                        <input name="confirmPassword"
                        type="password"
                        className="form-control"
                        id="confirm-passoword"
                        value={formData.confirmPassword}
                        onChange={handleChange}/>
                    </div>
                    <div className="auth-submit mb-3">
                        <button
                        type="submit">
                            Register
                        </button>
                    </div>
                </form>
                <button onClick={handleRegister}>
                    Log In
                </button>
            </div>
        </div>
    )
}