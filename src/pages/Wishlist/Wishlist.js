import React, { useState, useContext, useEffect } from "react"
import axios from "axios"

import { Context } from "../../contexts/Store"

import ListItem from "../../components/ListItem/ListItem"

const Wishlist = () => {
    const [resp, setResp] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const context = useContext(Context)

    useEffect(() => {
        setIsLoading(true)
        async function getResponse() {await axios.get(`https://developers.ria.com/dom/search?category=1&realty_type=2&operation_type=1&state_id=4&city_id=4&characteristic[209][from]=1&characteristic[209][to]=4&characteristic[234][from]=1&characteristic[234][to]=999999&characteristic[242]=239&api_key=Rlr82vMNVzxZ2Zo9mMtOiitbEQTxqS86u3f1WB8s`)
        .then(function (res) {
            setResp(res.data)
            setIsLoading(false)
        })}
        getResponse()
    }, [])

    return (
        <div>
                {!isLoading && resp && context.favouriteList.length > 0
                    ? context.favouriteList.map((item, index) => {
                        if (index >=0 && index < 10){
                            return (
                                <ListItem 
                                    key={index} 
                                    itemsId={item}
                                />  
                            )
                        }
                        return null
                    })
                    : "Ви ще не додали жодного оголошення"
                }        
        </div>
    )
}

export default Wishlist