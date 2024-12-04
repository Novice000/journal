import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "./utils/config";
import "./styles/App.css"

export default function Entries(){
    const [entries, setEntries] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchEntries(){
            async function getEntries(){
                try{
                    const response = await axiosInstance.get("/entries/")
                    if(response.statusText !== "OK"){
                        throw new Error("Request failed!")
                    }
                    const result = response.data? response.data: []
                    return result
                }catch(e){
                    alert(e)
                }finally{
                    setLoading(false)
                }
            }

            const data = await getEntries()
            if (entries){
                setEntries(data)
                setLoading(false)
            };
        } fetchEntries()
    }, []);

    if(loading){
        return (
            <div>
                loading . . .
            </div>
        )
    }

    function handleClick(id){
        navigate(`/update/${id}`)
    }

    function Entry({data}){
        const len = data.text.length > 200? 200 : data.text.length;
        return(
            <div className="border" id={data.id}
            onClick={()=>{ handleClick(data.id) }}>
                <div>
                    {data.text.substring(0,len)}...
                </div>
                <div>
                    {data.review}
                </div>
                <div> 
                    {new Date(data.timestamp).toLocaleString()}
                </div>
            </div>
        )
    }

    if(loading){
        return (
            <div>
                loading . . .
            </div>
        )
    }

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