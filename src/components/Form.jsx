import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import CustomInput from "./CustomInput";

const Form = ({ action, setVisible }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [error, setError] = useState(false);
  const [message, SetMessage] = useState("");

  const navigate = useNavigate();

  const validateForm = (action) => {
    console.log("HEY error");
    if (action === "signup") {
      if (username || email || password) {
        setError(false);
        console.log("YO!!");
        return true;
      }
    } else if (action === "login") {
      if (email || password) {
        setError(false);
        return true;
      }
    }
    SetMessage("Tous les champs sont obligatoires !!");
    return false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Submitted!!");

    if (validateForm(action)) {
      try {
        console.log("Just TRY!!");

        let objToPost = {};
        let url = "";

        if (action === "signup") {
          objToPost = {
            email,
            username,
            password,
            newsletter,
          };
          url =
            "https://site--backend-vinted--v5zlz7yt85wg.code.run/user/signup";
        } else {
          objToPost = {
            email,
            password,
          };
          url =
            "https://site--backend-vinted--v5zlz7yt85wg.code.run/user/login";
        }

        console.log("AXIOS READY");
        const response = await axios.post(url, objToPost);

        console.log("AXIOS SUCCES");

        const token = response.data.token;

        Cookies.set("token", token, { expires: 15 });

        console.log("READY TO GO!");

        console.log("CLEAR FORM");
        setUsername("");
        setEmail("");
        setUsername("");
        setPassword("");
        setNewsletter(false);

        console.log("BYE!!");
        setVisible(false);
        // navigate("/");
      } catch (error) {
        console.log(error.response.data.message);
        SetMessage(error.response.data.message);
        setError(true);
      }
    }
  };
  const handleChangeInput = (event, setter) => {
    setter(event.target.value);
  };

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <i
        onClick={() => {
          setVisible(false);
        }}
        className="close-circle far fa-times-circle"
      ></i>

      <h1>{action === "signup" ? "S'inscrire" : "Se connecter"}</h1>
      <div>{(error || message) && <p className="danger">{message}</p>}</div>

      {action === "signup" && (
        <CustomInput
          inputValue={username}
          setState={setUsername}
          type="text"
          placeholder="Nom d'utilisateur"
          label="username"
          title=""
          handleChangeInput={handleChangeInput}
        />
      )}

      <CustomInput
        inputValue={email}
        setState={setEmail}
        type="email"
        placeholder="Email"
        label="email"
        title=""
        handleChangeInput={handleChangeInput}
      />

      <CustomInput
        inputValue={password}
        setState={setPassword}
        type="password"
        placeholder="Mot de passe"
        label="password"
        title=""
        handleChangeInput={handleChangeInput}
      />

      {action === "signup" && (
        <div>
          <div className="newsletter-wrap">
            <input
              onChange={() => {
                setNewsletter(true);
              }}
              type="checkbox"
              id="newsletter"
              value={newsletter}
            />
            <label htmlFor="newsletter">S'inscrire à la newsletter</label>
          </div>

          <span className="legal-notice">
            En m'inscrivant je cofnirme avoir lu et accepté les Termes et
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans
          </span>
        </div>
      )}

      <input
        type="submit"
        className="btn-primary"
        value={`${action === "signup" ? "S'inscrire" : "Se connecter"}`}
      />

      {action === "signup" ? (
        <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
      ) : (
        <Link to="/signup">Pas encore de compte ? Inscrie-toi !</Link>
      )}
    </form>
  );
};

export default Form;
