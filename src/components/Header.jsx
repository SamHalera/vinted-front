import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";
const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to={"/"}>
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="filters-groups">
          <input
            className="search"
            type="text"
            placeholder="Recherche des articles"
          />
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
        </div>
        <div className="btn-groups">
          <button>S'incrire</button>
          <button>Se connecter</button>
        </div>
        <button>Vends tes articles</button>
      </div>
    </header>
  );
};
export default Header;
