import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import spinnerLogin from "../assets/images/spinner-login.gif";

const Publish = ({ token }) => {
  const [isSending, setIsSending] = useState(false);
  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState();

  const [previews, setPreviews] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [exchange, setExchange] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const fadeMainError = () => {
    setTimeout(() => {
      setError(false);
    }, 2000);
  };
  const handlePublishOffer = async (event) => {
    event.preventDefault();
    setIsSending(true);
    try {
      console.log("hello submit");

      if (
        !title ||
        !description ||
        !price ||
        !condition ||
        !city ||
        !brand ||
        !picture
      ) {
        setError(true);
        setIsSending(false);
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      } else {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("condition", condition);
        formData.append("city", city);
        formData.append("brand", brand);
        formData.append("size", size);
        formData.append("color", color);
        formData.append("payment", paymentMode);
        formData.append("exchange", exchange);
        formData.append("picture", picture);
        for (let i = 0; i < pictures.length; i++) {
          formData.append("pictures", pictures[i]);
        }

        const response = await axios.post(
          "http://localhost:3000/offer/publish",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setIsSending(false);
        console.log(response);
        navigate(`/offers/${response.data._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(picture);
  return token ? (
    <main className="publish">
      <div className="container">
        <form onSubmit={handlePublishOffer} className="ui-publish-offer">
          <h1>Vends ton article</h1>
          <div className="upload-picture">
            <div className="upload-container">
              <div className="upload-module">
                <label htmlFor="file">
                  <i className="fas fa-plus"></i> Ajoutez une photo
                </label>
                <input
                  id="file"
                  type="file"
                  onChange={(event) => {
                    console.log(event);
                    setPicture(event.target.files[0]);
                  }}
                />
              </div>
              {!picture && error && (
                <p className="danger">Ce champs est obligatoire</p>
              )}
            </div>

            <div className="preview-container">
              {picture && (
                <div>
                  <i
                    onClick={() => {
                      setPicture();
                    }}
                    className="close-circle fas fa-times-circle"
                  ></i>
                  <img
                    className="preview"
                    src={URL.createObjectURL(picture)}
                    alt=""
                  />
                </div>
              )}
            </div>
            <p></p>
          </div>
          <div className="upload-picture">
            <div className="upload-container">
              <div className="upload-module">
                <label htmlFor="files">
                  <i className="fas fa-plus"></i> Ajoutez une gallerie d'images
                  pour votre produit
                </label>
                <input
                  id="files"
                  type="file"
                  multiple
                  onChange={(event) => {
                    console.log(event.target.files);
                    const clonePictures = [...pictures];

                    Object.keys(event.target.files).map((key) => {
                      console.log("key", event.target.files[key]);

                      clonePictures.push(event.target.files[key]);
                      return;
                    });
                    setPictures(clonePictures);
                  }}
                />
              </div>
            </div>
            <div className="preview-container">
              {pictures.map((picture, index) => {
                return (
                  <div key={picture.name}>
                    <i
                      onClick={() => {
                        const clonePictures = [...pictures];
                        clonePictures.splice(index, 1);
                        setPictures(clonePictures);
                      }}
                      className="close-circle fas fa-times-circle"
                    ></i>
                    <img
                      className="preview"
                      src={URL.createObjectURL(picture)}
                      alt=""
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="title-content">
            <div className="title">
              <label htmlFor="title">Titre</label>
              {!title && error && (
                <p className="danger">Ce champs est obligatoire</p>
              )}
              <input
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                value={title}
                type="text"
                id="title"
                placeholder="ex: Chemis Sézanne verte"
              />
            </div>
            <div className="content">
              <label htmlFor="title">Décris ton article</label>
              {!description && error && (
                <p className="danger">Ce champs est obligatoire</p>
              )}
              <textarea
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                value={description}
                id="description"
                cols="30"
                rows="10"
                placeholder="ex: porté quelques fois, taille correctement"
              ></textarea>
            </div>
          </div>
          <div className="details-info">
            <div className="brand">
              <label htmlFor="brand">Marque</label>
              {!brand && error && (
                <p className="danger">Ce champs est obligatoire</p>
              )}
              <input
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
                value={brand}
                type="text"
                id="brand"
                placeholder="ex: Zara"
              />
            </div>
            <div className="size">
              <label htmlFor="size">Taille</label>
              <input
                onChange={(event) => {
                  setSize(event.target.value);
                }}
                value={size}
                type="text"
                id="size"
                placeholder="ex: L / 40 /12"
              />
            </div>
            <div className="color">
              <label htmlFor="color">Couleur</label>
              <input type="text" id="color" placeholder="ex: Fushia" />
            </div>
            <div className="condition">
              <label htmlFor="condition">Etat</label>
              {!condition && error && (
                <p className="danger">Ce champs est obligatoire</p>
              )}
              <input
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
                value={condition}
                type="text"
                id="condition"
                placeholder="ex: Neuf avec etiquette"
              />
            </div>
            <div className="city">
              <label htmlFor="city">Lieu</label>
              {!city && error && (
                <p className="danger">Ce champs est obligatoire</p>
              )}
              <input
                onChange={(event) => {
                  setCity(event.target.value);
                }}
                value={city}
                type="text"
                id="city"
                placeholder="ex: Paris"
              />
            </div>
          </div>
          <div className="price-info">
            <div className="price">
              <label htmlFor="price">Prix</label>
              {!price && error && (
                <p className="danger">Ce champs est obligatoire</p>
              )}
              <input
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
                value={price}
                type="text"
                id="price"
                placeholder="ex: 0.00 €"
              />
            </div>
            <div className="price">
              <label htmlFor="price">Modes de paiement</label>
              <input
                onChange={(event) => {
                  setPaymentMode(event.target.value);
                }}
                value={paymentMode}
                type="text"
                id="price"
                placeholder="ex: CB, PAYPAL..."
              />
            </div>
            <div className="newsletter">
              <input
                onChange={(event) => {
                  setExchange(event.target.value);
                }}
                value={exchange}
                type="checkbox"
                id="newsletter"
              />
              <label htmlFor="newsletter">
                Je suis interessé(e) par les échanges
              </label>
            </div>
          </div>

          {/* {error && (
            <p className="danger">
              Oups! tu as oublié de remplir quelque champs .... ☝
            </p>
          )} */}
          <button className="btn btn-primary" type="submit">
            Ajouter
            {isSending && (
              <img className="spinner-xs" src={spinnerLogin} alt="" />
            )}
          </button>
          {/* <input className="btn btn-primary" type="submit" value="Ajouter" /> */}
        </form>
      </div>
    </main>
  ) : (
    <Navigate to="/" />
  );
};

export default Publish;
