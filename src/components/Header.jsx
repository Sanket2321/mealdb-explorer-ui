
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
    return (
        <header className="app-header">
            <div className="header-left">
                <img src={logo} className="header-logo" alt="App logo" />
                <Link to="/" className="header-title">TheMealDB Explorer</Link>
            </div>
        </header>
    );
};

export default Header;
