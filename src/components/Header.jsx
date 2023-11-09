import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/images/logo.svg";
import Cookies from "js-cookie";
const Header = () => {
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
                navigate("/signup");
              }}
            >
              S'inscrire
            </button>
            <button
              onClick={() => {
                setIsHome(false);
                navigate("/login");
              }}
            >
              Se connecter
            </button>
          </div>
        )}

        <button>Vends tes articles</button>
      </div>
    </header>
  );
};
export default Header;
