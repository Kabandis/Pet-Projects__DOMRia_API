import React from "react"

import Header from "./components/Header/Header"
import Routes from "./constants/Routes"
import Store from "./contexts/Store"

const Main = () => {
    
    return (
        <Store>
            <div className="main">
                <Header />
                <Routes />
            </div>
        </Store>
    )
}

export default Main