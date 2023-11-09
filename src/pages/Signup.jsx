import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [error, setError] = useState(false);

  const [data, setData] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Submitted!!");

    if (!username || !email || !password || !newsletter) {
      setError(true);
    } else {
      try {
        const response = await axios.post(
          "https://site--backend-vinted--v5zlz7yt85wg.code.run/user/signup",
          {
            email,
            username,
            password,
            newsletter,
          }
        );
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
    <main className="signup-container">
      <div className="container">
        <h1>S'inscrire</h1>
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
          <input
            onChange={(event) => {
              handleChangeInput(event, setUsername);
            }}
            type="text"
            id="username"
            placeholder="Nom d'utilisateur"
            value={username}
          />
          <input
            onChange={(event) => {
              handleChangeInput(event, setEmail);
            }}
            type="email"
            id="email"
            placeholder="Email"
            value={email}
          />
          <input
            onChange={(event) => {
              handleChangeInput(event, setPassword);
            }}
            type="password"
            id="password"
            placeholder="Mot de passe"
            value={password}
          />
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

          <input type="submit" className="btn-primary" value="S'inscrire" />

          <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
        </form>
      </div>
    </main>
  );
};
export default Signup;
