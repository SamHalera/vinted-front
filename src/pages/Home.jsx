import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import imgPlaceholder from "../assets/images/img-placeholder.png";
import spinner from "../assets/images/spinner-login.gif";
const Home = ({
  token,
  isLoading,
  setIsLoading,
  setFormAction,
  setVisible,
  query,
  allOffers,
  setAllOffers,
  sortFilter,
  titleFilter,
  price,
  setRequestedLink,
}) => {
  const [data, setData] = useState();

  const navigate = useNavigate();

  console.log("query in home=>", query);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // "http://localhost:3000/"
          //query props comes from App.jsx from filters called in the header
          //If filters are not user query will be an empty string and we retrieve all offers
          //if filters are used query will contain the string with all the query values
          `http://localhost:3000/?title=${titleFilter}&sort=${sortFilter}`
        );
        console.log(response.data);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data, "mess");
      }
    };

    fetchData();
  }, [titleFilter, sortFilter, allOffers]);

  return isLoading ? (
    <div className="spinner">
      <img src={spinner} alt="" />
    </div>
  ) : (
    <main>
      <section className="hero-section bg-img-settings">
        <div className="ct-action">
          <h2>Prêts à faire du tri dans vos placards ?</h2>
          <button
            onClick={() => {
              if (token) {
                navigate("/publish");
              } else {
                //trigger Modal
                setVisible(true);
                setFormAction("login");
                setRequestedLink("/publish");
              }
            }}
            className="btn-cta"
          >
            Commencer à vendre
          </button>
        </div>
        <img
          src="https://lereacteur-vinted.netlify.app/static/media/tear.884480420945b3afd77b44a6c5f98567.svg"
          alt=""
        />
      </section>
      <section className="main-section">
        <div className="container">
          <div className="offers-list">
            <div className="head-section">
              <div className="">
                <h2>Les articles</h2>
              </div>
              <span
                className="all-offers"
                onClick={() => {
                  setAllOffers(!allOffers);
                }}
              >
                {allOffers ? "Voir les 10 premiers" : "Voir tout"}
              </span>
            </div>
            <div className="list">
              {data.offers && data.offers.length === 0 ? (
                <h3>Aucune offre n'a été trouvée!</h3>
              ) : !allOffers ? (
                data.offers.slice(0, 10).map((offer) => {
                  return (
                    <Link
                      to={`/offers/${offer._id}`}
                      key={offer._id}
                      className="list-item"
                    >
                      <div className="author">
                        {offer.owner.account.avatar ? (
                          <img
                            className="avatar"
                            src={offer.owner.account.avatar.secure_url}
                            alt=""
                          />
                        ) : (
                          <i className="no-avatar far fa-user-circle"></i>
                        )}

                        <span>{offer.owner.account.username} </span>
                      </div>
                      {offer.product_image ? (
                        <img
                          className="offer-picture"
                          src={offer.product_image.secure_url}
                          alt=""
                        />
                      ) : (
                        <img
                          className="offer-picture"
                          src={imgPlaceholder}
                          alt=""
                        />
                      )}

                      <div className="details">
                        <span className="price">{offer.product_price} €</span>
                        <span className="size">
                          {offer.product_details[1].TAILLE}
                        </span>
                        <span className="brand">
                          {offer.product_details[0].MARQUE}
                        </span>
                      </div>
                    </Link>
                  );
                })
              ) : (
                data.offers.map((offer) => {
                  return (
                    <Link
                      to={`/offers/${offer._id}`}
                      key={offer._id}
                      className="list-item"
                    >
                      <div className="author">
                        {offer.owner.account.avatar ? (
                          <img
                            className="avatar"
                            src={offer.owner.account.avatar.secure_url}
                            alt=""
                          />
                        ) : (
                          <i className="no-avatar far fa-user-circle"></i>
                        )}

                        <span>{offer.owner.account.username} </span>
                      </div>
                      {offer.product_image ? (
                        <img
                          className="offer-picture"
                          src={offer.product_image.secure_url}
                          alt=""
                        />
                      ) : (
                        <img
                          className="offer-picture"
                          src={imgPlaceholder}
                          alt=""
                        />
                      )}

                      <div className="details">
                        <span className="price">{offer.product_price} €</span>
                        <span className="size">
                          {offer.product_details[1].TAILLE}
                        </span>
                        <span className="brand">
                          {offer.product_details[0].MARQUE}
                        </span>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
