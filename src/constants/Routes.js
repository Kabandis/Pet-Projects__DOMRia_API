import React from "react"
import { Switch, Route } from "react-router-dom"

import Home from "../pages/Home/Home"
import Wishlist from "../pages/Wishlist/Wishlist"
import Advertisement from "../pages/Advertisement/Advertisement"

export default () => {
    return (
        <Switch>
            <Route 
                path="/" 
                component={Home} 
                exact
            />
            {/* <Route 
                path="/:id" 
                render={Home}
            /> */}
            <Route 
                path="/wishlist" 
                component={Wishlist}
            />
            <Route 
                path="/advertisement/:id" 
                render={(props) => <Advertisement {...props}/>}
            />
        </Switch>
    )
}