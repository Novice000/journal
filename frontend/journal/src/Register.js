import { useState } from "react"
import axiosInstance from "./utils/config"
import {useNavigate} from "react-router"

export default function  Register(){
   const [formData, setFormData] = useState({})
   const [message, setMessage] = useState("")
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
                navigate("/login")
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
                    <label htmlFor="email">
                        email:
                    </label>
                    <input 
                    id="email"
                    name="email"
                    value= {formData.email}
                    onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="password">
                        password:
                    </label>
                    <input name="password"
                    type="password"
                    id="passoword"
                    value={formData.password}
                    onChange={handleChange}/>
                    <p>{ message }</p>
                </div>
                <div>
                    <label htmlFor="confirm-password">
                       Confirm password:
                    </label>
                    <input name="confirmPassword"
                    type="password"
                    id="confirm-passoword"
                    value={formData.confirmPassword}
                    onChange={handleChange}/>
                </div>
                <div>
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
    )
}