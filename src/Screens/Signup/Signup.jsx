import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import "./Signup.css";

const Signup = () => {
    const proxy = "http://localhost:5000";
    const [signUpData , setSignUpData] = useState({
        name: "",
        email: "",
        password: "",
        adminKey: "",
    });

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        try {
            axios.post(`${proxy}/myclat/admins/adminregister`, signUpData).then((res)=>{
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="Signuppage">
            <div className="signupformdata">
                <h1>Sign up</h1>
            <form className="Signupform" onSubmit={(e)=>handleSignupSubmit(e)}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" onChange={(e) => setSignUpData({...signUpData ,name: e.target.value})}  required/>
                <label htmlFor="email" >Email</label>
                <input type="email" name="email" onChange={(e) => setSignUpData({...signUpData ,email: e.target.value})} required />
                <label htmlFor="password">password</label>
                <input type="password" name="password" onChange={(e) => setSignUpData({...signUpData ,password: e.target.value})}  required/>
                <label htmlFor="adminkey">Admin Key</label>
                <input type="password" name="adminkey" onChange={(e) => setSignUpData({...signUpData ,adminKey: e.target.value})} required/>
                <button type="submit">Submit</button>
            </form>
            </div>
        </div>
    );
};

export default Signup;