import { useNavigate, useLocation } from "react-router-dom";
import FiltersGroup from "./FiltersGroup";

import logo from "../assets/images/logo.svg";

const Header = ({
  setVisible,
  setFormAction,
  token,
  handleToken,
  sortFilter,
  setSortFilter,
  titleFilter,
  setTitleFilter,
  price,
  setPrice,
  requestedLink,
  setRequestedLink,
  isLoadingData,
  setIsLoadingData,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location);

  if (location.pathname === "/") {
    console.log("HOME");
  }
  return (
    <header>
      <div className="container">
        <div className="logo">
          <div
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={logo} alt="" />
          </div>
        </div>
        {location.pathname === "/" ? (
          <FiltersGroup
            titleFilter={titleFilter}
            setTitleFilter={setTitleFilter}
            sortFilter={sortFilter}
            setSortFilter={setSortFilter}
            price={price}
            setPrice={setPrice}
            isLoadingData={isLoadingData}
            setIsLoadingData={setIsLoadingData}
          />
        ) : (
          <div className="filters-groups"></div>
        )}

        {token ? (
          <div className="btn-groups">
            <button
              onClick={() => {
                // Cookies.remove("token");
                handleToken(null);
                navigate("/");
              }}
              className="btn btn-secondary"
            >
              Se deconnecter
            </button>
          </div>
        ) : (
          <div className="btn-groups">
            <button
              onClick={() => {
                setFormAction("signup");
                //trigger Modal
                setVisible(true);
              }}
              className="btn btn-secondary"
            >
              S'inscrire
            </button>
            <button
              onClick={() => {
                setFormAction("login");
                //trigger Modal
                setVisible(true);
              }}
              className="btn btn-secondary"
            >
              Se connecter
            </button>
          </div>
        )}

        <button
          onClick={() => {
            if (token) {
              navigate("/publish");
            } else {
              //trigger Modal
              setRequestedLink("/publish");
              setFormAction("login");
              setVisible(true);
            }
          }}
          className="btn btn-primary"
        >
          Vends tes articles
        </button>

        <div className="user-profile"></div>
      </div>
    </header>
  );
};
export default Header;
