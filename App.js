import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./Login";
import Register from "./Register";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>

  );
}

export default App;
