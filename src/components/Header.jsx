import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/images/logo.svg";
import Cookies from "js-cookie";
const Header = ({ visible, setVisible, setFormAction }) => {
  const [isHome, setIsHome] = useState(true);
  const navigate = useNavigate();
  return (
    <header>
      <div className="container">
        <div className="logo">
          <div
            onClick={() => {
              setIsHome(true);
              navigate("/");
            }}
          >
            <img src={logo} alt="" />
          </div>
        </div>
        <div className="filters-groups">
          <input
            className="search"
            type="text"
            placeholder="Recherche des articles"
          />
          <i className="search-icon fas fa-search"></i>

          {isHome === true && (
            <div className="filters">
              <div className="filter-price">
                <label htmlFor="price">Trier par prix</label>
                <input type="checkbox" id="price" />
              </div>
              <div className="filter-range-price">
                <label htmlFor="range">Prix entre</label>
                <input type="range" id="range" min="10" max="1000" />
              </div>
            </div>
          )}
        </div>

        {Cookies.get("token") ? (
          <div className="btn-groups">
            <button
              onClick={() => {
                Cookies.remove("token");
                navigate("/");
              }}
              className="btn-primary"
            >
              Se deconnecter
            </button>
          </div>
        ) : (
          <div className="btn-groups">
            {/* <Link to={"/signup"}>S'incrire</Link> */}

            <button
              onClick={() => {
                setIsHome(false);
                setFormAction("signup");

                setVisible(true);
                // navigate("/signup");
              }}
              className="btn-primary"
            >
              S'inscrire
            </button>
            <button
              onClick={() => {
                setIsHome(false);
                setFormAction("login");

                setVisible(true);
                // navigate("/login");
              }}
              className="btn-primary"
            >
              Se connecter
            </button>
          </div>
        )}

        <button className="btn-primary">Vends tes articles</button>
      </div>
    </header>
  );
};
export default Header;
