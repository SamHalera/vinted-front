import { useState } from "react";
import axios from "axios";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import spinner from "../assets/images/spinner-login.gif";
import { Link } from "react-router-dom";
const CheckoutForm = ({ userId, name, price, productId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    //user/buyer card infos
    const cardElement = elements.getElement(CardElement);

    const stripeRespose = await stripe.createToken(cardElement, {
      name: userId,
    });
    // console.log(stripeRespose);

    const stripeToken = stripeRespose.token.id;

    const response = await axios.post(
      "https://site--backend-vinted--v5zlz7yt85wg.code.run/payment",
      {
        stripeToken,
        productId,
        name,
        price,
      }
    );
    console.log("response here:", response.data.response.status);

    if (response.data.response.status === "succeeded") {
      console.log("SUCCES HERE!!");
      setCompleted(true);
      setIsSending(false);
    }
    console.log(completed);
  };
  return (
    <div className="checkout-form">
      {!completed ? (
        <form onSubmit={handleSubmit} action="">
          <CardElement />
          <button type="submit">
            Valider{" "}
            {isSending && <img className="spinner-xs" src={spinner} alt="" />}
          </button>
        </form>
      ) : (
        <div className="feedback">
          <h1>Merci pour votre achat!!</h1>
          <p>Le produit sera bientôt livré chez vous!! 🚚</p>
          <Link to="/" className="btn btn-primary">
            Regardez d'autres offers
          </Link>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
