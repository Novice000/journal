import { useEffect, useState } from "react";
import axiosInstance from "./utils/config";
import { isAccessTokenExpired, isRefreshTokenExpired, refreshToken } from "./utils/helper";
import {useNavigate} from "react-router"

export default function Entries(){
    const [entries, setEntries] = useState([])
    const navigate = useNavigate()

    async function getEntries(){
        try{
            const response = await axiosInstance.get("/entries/")
            if(response.status !== 201){
                throw new Error("Request failed!")
            }
            const result = response.data()? response.data: []
            return result
        }catch(e){
            alert("failed to get entres", e)
        }
    }

    useEffect(() => {
        if (isAccessTokenExpired() && !isRefreshTokenExpired()) {
            refreshToken(); // Attempt to refresh token
        } else if (isAccessTokenExpired() && isRefreshTokenExpired()) {
            navigate("/login"); // Redirect to login if both tokens expired
            return
        }
        setEntries(getEntries);
    }, [navigate]);



    async function handleClick(e){
        try{
            const id = e.target.id
            const response = await axiosInstance.get(`/entry/${id}`)
            if(response.status !== 201 || response.status !== 200){
                throw new Error("failed to fetch")
            }
            navigator("/update")
        }catch(e){
            return <div>
                <h2> {e} </h2>
            </div>
        }
    }

    function Entry(data){
        const len = data.text.length > 200? 200 : data.text.length;
        return(
            <div id={data.id}
            onClick={handleClick}>
                <div>
                    {data.user.username}
                </div>
                <div>
                    {data.text.substring(0,len)}...
                </div>
                <div>
                    {data.review}
                </div>
                <div> 
                    {data.timeStamp}
                </div>
            </div>
        )
    }


    setEntries(getEntries())
    if(!entries.length){
        return(
            <div>
                <h2>
                    Empty, Try Journaling sometime
                </h2>
            </div>
        )
    }

    return(
        <div>
            {entries.map((element,index)=>(
                <Entry key={index} data={element} />
            ))}
        </div>
    )

}