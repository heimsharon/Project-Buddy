import React from "react";

const Header = () => {
    return (
        <header className="flex-row px-1">
        <h1>
            <a href="/">Header</a>
        </h1>
        <nav>
            <ul className="flex-row">
            <li className="mx-2">
                <a href="/">Home</a>
            </li>
            <li className="mx-2">
                <a href="/about">About</a>
            </li>
            <li className="mx-2">
                <a href="/contact">Contact</a>
            </li>
            </ul>
        </nav>
        </header>
    );
    }

export default Header;