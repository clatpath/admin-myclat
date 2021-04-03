import axios from 'axios';
import React, { useState } from 'react';
import "./Login.css";

const Login = () => {
    const proxy = "http://localhost:5000";
    const [loginData , setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleLogin = (e) => {
        e.preventDefault();
        try {
            axios.post(`${proxy}/myclat/admins/adminlogin`, loginData).then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className="loginpage">
            <div className="formdata">
                <h1>Sign in</h1>
                <form className="loginform" onSubmit={(e) => handleLogin(e)} >
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email"  onChange={(e)=>setLoginData({email:e.target.value})}  />
                    <label htmlFor="password" >Password</label>
                    <input type="password" name="password" onChange={(e)=>setLoginData({...loginData ,password:e.target.value})} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Login;