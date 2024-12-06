import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axiosInstance from "./utils/config";
import "./styles/App.css"
import Error from "./Error";
import { HashLoader } from "react-spinners";

export default function Entries() {
    const [entries, setEntries] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchEntries() {
            async function getEntries() {
                try {
                    const response = await axiosInstance.get("/entries/")
                    if (response.statusText !== "OK") {
                        throw new Error("Request failed!")
                    }
                    const result = response.data ? response?.data : []
                    return result
                } catch (e) {
                    <Error error={e} />
                } finally {
                    setLoading(false)
                }
            }

            const data = await getEntries()
            if (entries) {
                setEntries(data)
                setLoading(false)
            };
        } fetchEntries()
    }, []);

    if (loading) {
        return (
            <div className="loader-container">
                <HashLoader loading={loading} color="#3e2723" size={20} />
            </div>
        );
    }

    function handleClick(id) {
        navigate(`/update/${id}`)
    }

    function Entry({ data }) {
        const len = data?.text.length > 200 ? 200 : data.text.length;
        return (
            <div className="card" id={data?.id}
                onClick={() => { handleClick(data?.id) }}>
                <div className="card-timestamp">
                    <p>{new Date(data?.timestamp).toLocaleString("en-US", {
                        weekday: "long", month: "long", year: "numeric", day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</p>
                </div>
                <div className="card-text">
                    <p>{data.text.substring(0, len)}...</p>
                </div>
                <div className="card-review">
                    <p>{data?.review}</p>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div>
                loading . . .
            </div>
        )
    }

    if (!entries.length) {
        return (
            <div className="empty">
                <h2>
                    Empty, Try Journaling sometime
                </h2>
            </div>
        )
    }

    return (
        <div className="entries-page">
            {entries.map((element, index) => (
                <Entry key={index} data={element} />
            ))}
        </div>
    )

}