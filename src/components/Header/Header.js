import React from "react"
import { NavLink, Link } from "react-router-dom"

const Header = () => {
    return (
        <nav className="header " >
                <Link 
                    className="logo"
                    to="/" 
                >
                    Лисенко Т.В.
                </Link>
                <ul className="nav">
                    <li className="nav_item">
                        <NavLink 
                            className="nav_link"
                            to="/"
                        >
                            Головна
                        </NavLink>
                    </li>
                    <li className="nav_item">
                        <NavLink 
                            className="nav_link"
                            to="/wishlist"
                        >
                            Обране
                        </NavLink>
                    </li>
                </ul>
        </nav>
    )
}

export default Header