import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Offer = () => {
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
        const response = await axios.get(
          `https://site--backend-vinted--v5zlz7yt85wg.code.run/offers/${id}`
        );
        console.log(response.data);
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
    <p className="loading">Loading....</p>
  ) : error ? (
    <p>{error.data.message}</p>
  ) : (
    <main className="offer-page">
      <article className="one-offer">
        <div className="container">
          <img src={data.product_image.secure_url} alt="" />
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
                    src={data.product_image.secure_url}
                    alt=""
                  />
                ) : (
                  <div className="avatar"></div>
                )}
                <span>{data.owner.account.username}</span>
              </div>
            </div>
            <button className="btn-primary">Acheter</button>
          </div>
        </div>
      </article>
    </main>
  );
};

export default Offer;
