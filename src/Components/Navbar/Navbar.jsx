import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
    const history = useHistory();
    return (
        <div className="navbar">
            <div className="navHeader" onClick={()=> history.push("/")}>
                <h2>Myclat DashBoard</h2>
            </div>
            <div className="navLinks">
                <Link to="/signin">
                    <a className="signinBtn">Sign in</a>
                </Link>
                <Link to="/signup">
                    <a className="signupBtn">Sign up</a>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;