import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1 className="header">DocProject</h1>
      <div className="content">
        <br/>
        <h2>Get started...</h2>
        <div>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <br />
        <h3>or</h3>
        <div>
          <Link to="/register">
            <button className="button">Create New Account</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
