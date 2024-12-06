export default function Error({error}){

    return(
        <div>
            <div>
                <h2>
                    Error {error.status}
                </h2>
                <p>
                    {error.message}
                </p>
                <p>
                    try reloading...
                </p>
            </div>
        </div>
    )
}