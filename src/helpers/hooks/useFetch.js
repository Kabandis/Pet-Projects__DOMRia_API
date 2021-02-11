import { useState, useEffect } from "react"
import axios from "axios"

export default url => {
    const baseUrl = "https://developers.ria.com/dom/"
    const [isLoading, setIsLoading] = useState(true)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    
    const doFetch = () => {
        setIsLoading(true)
    } 

    useEffect(() => {
        if (!isLoading) {
            return
        }
        axios.get(baseUrl + url)
            .then(function (res) {
                setIsLoading(false)
                setResponse(res.data)
            })
            .catch(function (error) {
                console.log("error", error)
                setIsLoading(false)
                setError(error.response)
            })
    }, [isLoading, url])

    return [{isLoading, response, error}, doFetch]
}