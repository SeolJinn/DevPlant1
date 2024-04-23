import { useRef, useState, useEffect } from "react";
import {faCheck, faTimes, faInfoCircle, faInfo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from './api/axios';
import { Link } from "react-router-dom";

const USER_REGEX = /^[a-zA-Z0-9]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]){8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COMPANY_REGEX = /^[a-zA-Z0-9\s]{3,}$/;
const REGISTER_URL = "/register";

const Register = () => {
    const companyRef = useRef();
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const errRef = useRef();

    const [company, setCompany] = useState("");
    const [validCompany, setValidCompany] = useState(false);
    const [companyFocus, setCompanyFocus] = useState(false);
    
    const [firstName, setFirstName] = useState("");
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);
    
    const [lastName, setLastName] = useState("");
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        companyRef.current.focus();
    }, []);

    useEffect(() => {
        firstNameRef.current.focus();
    }, []);

    useEffect(() => {
        lastNameRef.current.focus();
    }, []);

    useEffect(() => {
        const result = COMPANY_REGEX.test(company);
        setValidCompany(result);
    }, [company]); 

    useEffect(() => {
        const result = USER_REGEX.test(firstName);
        setValidFirstName(result);

    }, [firstName]);

    useEffect(() => {
        const result = USER_REGEX.test(lastName);
        setValidLastName(result);

    }, [lastName]);

    useEffect(() => {
        const result = USER_REGEX.test(email);
        setValidEmail(result);

    }, [email]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);     
        setValidPwd(result);
        const match= pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg("");
    }, [company, firstName, lastName, email, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = COMPANY_REGEX.test(company);
        const v2 = USER_REGEX.test(firstName);
        const v3 = USER_REGEX.test(lastName);
        const v4 = EMAIL_REGEX.test(email);
        const v5 = PWD_REGEX.test(pwd);

        if (!v1 || !v2 || !v3 || !v4 || !v5) {
            setErrMsg("Invalid input fields");
            return;
        }
        try{
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({company,firstName, lastName, email, pwd}),
                
                {
                    headers: {
                        "Content-Type": "application/json",
                        withCredentials: true,
                    },
                }
            );
            console.log(response);
            console.log(response.data);
            console.log(JSON.stringify(response));
            setSuccess(true);
            // clear input fields
        }catch(err){
            if(!err?.response){
                setErrMsg('No Server Response');
            }
            else{
                if(err.response.status === 409){
                    setErrMsg('User already exists');
                }else{
                    setErrMsg('Registration failed');
                }    
            } 
            errRef.current.focus();   
        }
    };
    return (
        <>{
            success ?(
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign in</a>
                    </p>
                </section>
            ) : (
        <section>
            <p 
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live = "assertive"
            > 
                {errMsg} 
            </p>
            <h1 className="header">DocProject</h1>
            <br />
            <br />
            <div className="title">
                <h2>Create new account</h2>
                <br />

                <form className="content" onSubmit={handleSubmit}>
                    <label htmlFor="company">
                        Company:
                        <span className={validCompany ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validCompany || !companyFocus ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input
                        type="text"
                        id="company"
                        ref={companyRef}
                        autoComplete="off"
                        onChange={(e) => setCompany(e.target.value)}
                        required
                        aria-invalid={validCompany ? "false" : "true"}
                        aria-describedby="companyNote"
                        onFocus={() => setCompanyFocus(true)}
                        onBlur={() => setCompanyFocus(false)}
                    />
                    <br/>
                    <div className="instr">
                    <p  
                        id="companyNote"
                        className={
                            companyFocus && company && !validCompany ? "instructions" : "offscreen"
                        }
                    >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        3 or more characters. 
                        Letters, numbers, and spaces allowed.
                    </p>
                    </div>
                    <br/>

                    <label htmlFor="firstName">
                        First Name:
                        <span className={validFirstName ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validFirstName || !firstNameFocus ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>    
                    </label>
                    <input 
                        type="text"
                        id="firstName"
                        ref={firstNameRef}
                        autoComplete="off"
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        aria-invalid={validFirstName ? "false" : "true"}
                        aria-describedby="firstNameNote"
                        onFocus={() => setFirstNameFocus(true)}
                        onBlur={() => setFirstNameFocus(false)}
                    /> 
                    <br/>
                    <div className="instr">
                    <p 
                        id="firstNameNote"
                        className={firstNameFocus && firstName &&
                        !validFirstName ? "instructions" : "offscreen"}
                    >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters.<br />
                        Must begin with a letter.<br/>
                        Letters, numbers, underscores, hyphens allowed.       
                    </p> 
                    </div>
                    <br/>

                    <label htmlFor="lastName">
                        Last Name:
                        <span className={validLastName ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validLastName || !lastNameFocus ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        ref={lastNameRef}
                        autoComplete="off"
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        aria-invalid={validLastName ? "false" : "true"}
                        aria-describedby="lastNameNote"
                        onFocus={() => setLastNameFocus(true)}
                        onBlur={() => setLastNameFocus(false)}
                    />
                    <br/>
                    <div className="instr">
                    <p
                        id="lastNameNote"
                        className={
                            lastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"
                        }
                    >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.
                    </p>
                    </div>
                    <br/>

                    <label htmlFor="email">
                        Email:
                        <span className={validEmail ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validEmail || !emailFocus ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                    </label>
                    <input
                        type="text"
                        id="email"
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="emailNote"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    <br/>
                    <div className="instr">
                    <p
                        id="emailNote"
                        className={
                            emailFocus && email && !validEmail ? "instructions" : "offscreen"
                        }
                    >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must be a valid email address.
                    </p>
                    </div>
                    <br/>

                    <label htmlFor="password">
                        Password:
                        <span className={validPwd ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validPwd || !pwd ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>    
                    </label>
                    <input 
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    /> 
                    <br/>
                    <div className="instr">
                    <p id="pwdnote" className={pwdFocus &&
                        !validPwd ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, numbers, and special characters.<br/>
                        Allowed special characters:<span aria-label="exclamation mark">!</span>
                        <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
                        <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p> 
                    </div>
                    <br/>

                    <label htmlFor="confirm_pwd">
                        Confirm Password:
                        <span className={validMatch && matchPwd ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>    
                    </label>
                    <input 
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    /> 
                    <br/>
                    <div className="instr">
                    <p id="confirmnote" className={matchFocus &&
                        !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p> 
                    </div>
                    <br/>
                    <br/>

                    <button className="button" disabled={!validCompany || !validFirstName || !validLastName || !validEmail || !validPwd || !validMatch}>
                        Create account
                    </button>
                </form>
                <p>
                    Already have an account?<br />
                    <button><Link to="/login">Sign in</Link></button>
                </p>
            </div>
        </section>
            )}
        </>
    );
}
export default Register;