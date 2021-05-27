import React, { useEffect, useState } from "react"

import Header from "./components/Header/Header"
import Routes from "./constants/Routes"

import { Context } from "./contexts/Store"


const Main = () => {
    const [initialContext, setInitialState] = useState({
        favouriteList: []
    })

    /* const addToWishlist = () => {
        setInitialState(context.favouriteList)
    } */

    const changeFavouriteList = value => {
        setInitialState({...initialContext, favouriteList: value})
    }

    useEffect(() => {
        console.log("ajsdaj", initialContext.favouriteList)
    }, [initialContext.favouriteList])

    return (
        <Context.Provider value={{...initialContext, changeFavouriteList}} >
            <div className="main">
                <Header />
                <Routes />
            </div>
        </Context.Provider>
    )
}

export default Main