import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/");
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <main>
      <section className="hero-section bg-img-settings">
        <div className="ct-action">
          <h2>Prêts à faire du tri dans vos placards ?</h2>
          <button className="btn-primary">Commencer à vendre</button>
        </div>
      </section>
      <section className="main-section">
        <div className="container">
          <div className="offers-list">
            <div className="head-section">
              <h2>Tous les articles</h2>
              <span>Voir tout</span>
            </div>
            <div className="list">
              {data.offers.map((offer) => {
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
                        <div className="avatar"></div>
                      )}

                      <span>{offer.owner.account.username} </span>
                    </div>
                    <img
                      className="offer-picture"
                      src={offer.product_image.secure_url}
                      alt=""
                    />
                    <div className="details">
                      <span className="price">{offer.product_price} </span>
                      <span className="size">
                        {offer.product_details[1].TAILLE}{" "}
                      </span>
                      <span className="brand">
                        {offer.product_details[0].MARQUE}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;