import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

//Components
import Form from "../components/Form";

const Signup = () => {
  return (
    <main className="signup-container">
      <div className="container">
        <h1>S'inscrire</h1>

        <Form action="signup" />
      </div>
    </main>
  );
};
export default Signup;
