import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "./context/AuthProvider";
import { Link } from "react-router-dom";
import axios from "./api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
    const {setAuth} = useContext(AuthContext);
    const useref = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        useref.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [email, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try{
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({email, pwd}),
                {
                    headers: {
                        "Content-Type": "application/json",},
                        withCredentials: true,
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({email, pwd, roles, accessToken});
            setEmail("");
            setPwd("");
            setSuccess(true);    
        }catch(err){
            if(!err.response){
                setErrMsg("No server response");
            }else if(err.response.status === 401){
                setErrMsg("Invalid credentials");
                }else if(err.response.status === 400){
                    setErrMsg("Missing credentials");
                    }else{
                        setErrMsg("Login failed. Please try again.");
                    }
            errRef.current.focus();        
        }
    }

    return (
        <>  
            {success ? (
                <section>
                    <h1>Sign In Successful</h1>
                    <br />
                    <p>
                        <a href="#">Go to home</a>
                    </p>
                </section>
            ) : (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} 
            aria-live="assertive">{errMsg}</p>
            <h1 className="header">
                DocProject
            </h1>
            <br/>
            <div className="title">
                <h2>
                    Login
                </h2>
                <br />
                <form className="content" onSubmit={handleSubmit}>
                    <label htmlFor="email"> E-mail: </label> 
                    <input
                        type="text"
                        id="email"
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        ref={useref}
                    />
                    <br />
                    <br />
                    <label htmlFor="password"> Password: </label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <br />
                    <br />
                    <button className="button" type="submit">Login</button> 
                    <p>
                        Don't have an account?<br />
                        <button><Link to="/Register">Sign up</Link></button>          
                    </p>
                </form>
            </div>    
        </section>
        )}
        </>
    );
}
export default Login;