import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CustomInput from "./CustomInput";

import spinnerLogin from "../assets/images/spinner-login.gif";

const Form = ({
  action,
  setVisible,
  isLoading,
  setIsLoading,
  handleToken,
  error,
  setError,
  errorMessage,
  setErrorMessage,
  requestedLink,
}) => {
  const [profilePicture, setProfilePicture] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    setError(false);
    setErrorMessage("");

    console.log("Form Submitted...");

    try {
      console.log("Inside TRY!!");

      let objToPost;
      let url = "";

      if (action === "signup") {
        const formData = new FormData();
        formData.append("avatar", profilePicture);
        formData.append("email", email);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("newsletter", newsletter);
        objToPost = formData;
        // objToPost = {
        //   email,
        //   username,
        //   password,
        //   newsletter,
        // };
        url = "http://localhost:3000/user/signup";
      } else {
        objToPost = {
          email,
          password,
        };
        url = "http://localhost:3000/user/login";
      }

      console.log("AXIOS READY");
      const response = await axios.post(url, objToPost);

      console.log("AXIOS SUCCES");

      const token = response.data.token;

      // Cookies.set("token", token, { expires: 15 });
      handleToken(token);

      setIsLoading(false);
      console.log("CLEAR FORM");
      setUsername("");
      setEmail("");
      setUsername("");
      setPassword("");
      setNewsletter(false);

      console.log("Close MODAL!!");

      //Colosing modal component
      setVisible(false);
      navigate(requestedLink);
    } catch (error) {
      console.log(error.response.data.message);

      // setErrorMessage(error.response.data.message);
      setError(true);

      if (error.response.data.message === "All fields are required!") {
        // Je met à jour mon state errorMessage
        setErrorMessage("Please fill in all fields");
      } else if (error.response.status === 409) {
        setErrorMessage(
          "This email already has an account, please use another one :)"
        );
      }
    }
  };
  const handleChangeInput = (event, setter) => {
    setter(event.target.value);
  };

  return (
    <form
      className="modal-form"
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
      <div>
        {(error || errorMessage) && <p className="danger">{errorMessage}</p>}
      </div>
      <div className="first-section">
        {action === "signup" && (
          <div className="profile">
            <label htmlFor="files">
              <i className="fas fa-plus"></i> photo de profile
            </label>
            <input
              id="files"
              type="file"
              onChange={(event) => {
                console.log(event);
                setProfilePicture(event.target.files[0]);
              }}
            />

            <div className="preview-container">
              {profilePicture && (
                <div>
                  <i
                    onClick={() => {
                      setProfilePicture();
                    }}
                    className="close-circle fas fa-times-circle"
                  ></i>
                  <img
                    className="preview"
                    src={URL.createObjectURL(profilePicture)}
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <div className="all-inputs">
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
        </div>
      </div>

      {action === "signup" && (
        <div className="newsletter-container">
          <div className="newsletter-wrap">
            <input
              onChange={() => {
                setNewsletter(true);
              }}
              type="checkbox"
              id="newsletter"
              checked={newsletter}
            />
            <label htmlFor="newsletter">S'inscrire à notre newsletter</label>
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
        className="btn btn-primary"
        value={`${action === "signup" ? "S'inscrire" : "Se connecter"}`}
        disabled={isLoading}
      />
      {isLoading && <img className="spinner-xs" src={spinnerLogin} alt="" />}

      {action === "signup" ? (
        <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
      ) : (
        <Link to="/signup">Pas encore de compte ? Inscrie-toi !</Link>
      )}
    </form>
  );
};

export default Form;
