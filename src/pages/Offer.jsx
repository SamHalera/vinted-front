import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import imgPlaceholder from "../assets/images/img-placeholder.png";
import spinner from "../assets/images/spinner.gif";
const Offer = ({
  setVisible,
  setFormAction,
  setRequestedLink,
  token,
  userId,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  if (error) {
    console.log("error:", error.data.message);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        //"http://localhost:3000/offers/:id"
        const response = await axios.get(`http://localhost:3000/offers/${id}`);
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.response);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <div className="spinner">
      <img src={spinner} alt="" />
    </div>
  ) : error ? (
    <p>{error.data.message}</p>
  ) : (
    <main className="offer-page">
      <article className="one-offer">
        <div className="container">
          <div className="pictures-section">
            {data.product_image ? (
              <img
                className="product-image"
                src={data.product_image.secure_url}
                alt=""
              />
            ) : (
              <img className="product-image" src={imgPlaceholder} alt="" />
            )}

            {data.product_pictures.length > 0 && (
              <div className="pictures-carousel">
                <i className="fas fa-arrow-circle-left"></i>
                <i className="fas fa-arrow-circle-right"></i>
                <div>
                  {data.product_pictures.map((img) => {
                    return (
                      <img
                        className="item-carousel"
                        key={img}
                        src={img}
                        alt=""
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="offer-details">
            <div className="details">
              <p className="price">{data.product_price} €</p>

              {data.product_details.map((detail) => {
                console.log(detail);

                for (const key in detail) {
                  console.log(`${key} => ${detail[key]}`);
                  return (
                    <div className="detail-item" key={detail[key]}>
                      <span>{key}</span>
                      <span>{detail[key]}</span>
                    </div>
                  );
                }
              })}
            </div>
            <div className="divider"></div>
            <div className="product-content">
              <p className="product-name">{data.product_name}</p>
              <p className="product-description">{data.product_description}</p>

              <div className="author">
                {data.owner.account.avatar ? (
                  <img
                    className="avatar"
                    src={data.owner.account.avatar.secure_url}
                    alt=""
                  />
                ) : (
                  <i className="no-avatar far fa-user-circle"></i>
                )}
                <span>{data.owner.account.username}</span>
              </div>
            </div>
            <button
              onClick={() => {
                {
                  if (token) {
                    navigate("/payment", {
                      state: {
                        name: data.product_name,
                        price: data.product_price,
                        description: data.product_description,
                      },
                    });
                  } else {
                    //trigger Modal
                    setRequestedLink("/payment");
                    setFormAction("login");
                    setVisible(true);
                  }
                }
              }}
              className="btn btn-primary"
            >
              Acheter
            </button>
          </div>
        </div>
      </article>
    </main>
  );
};

export default Offer;
