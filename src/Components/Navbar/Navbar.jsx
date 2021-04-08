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
                <Link to="/signin" className="signinBtn">
                    Sign in
                </Link>
                <Link to="/signup" className="signupBtn">
                    Sign up
                </Link>
            </div>
        </div>
    );
};

export default Navbar;