import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import CustomInput from "./CustomInput";

const Form = ({ action }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [error, setError] = useState(false);

  const [data, setData] = useState();
  const navigate = useNavigate();

  const validateForm = (action) => {
    if (action === "signup") {
      if (username || email || password || newsletter) {
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
    return false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Submitted!!");

    if (validateForm(action)) {
      try {
        console.log("HERE!!");
        let objToPost = {};
        let url = "";
        if (action === "signup") {
          console.log(email);
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

        console.log(objToPost, url);

        const response = await axios.post(url, objToPost);

        console.log("AXIOS SUCCES");

        const token = response.data.token;
        console.log(token);
        Cookies.set("token", token, { expires: 15 });
        // setData(response.data);

        //console.log("data =>", response.data.token);
        navigate("/");

        console.log("READY TO GO!");
        setUsername("");
        setEmail("");
        setUsername("");
        setPassword("");
        setNewsletter(false);
      } catch (error) {
        console.log(error.response);
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
      action=""
    >
      <div>
        {error && (
          <p className="danger">Tous les champs sont obligatoires !!</p>
        )}
      </div>

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
            En m'inscrivant je cofnirme avoir lu et accepté les Termes é&
            Conditions et Politique de Confidentialité de VInted. Je confirme
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
