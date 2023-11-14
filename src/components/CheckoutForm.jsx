import { useState } from "react";
import axios from "axios";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
const CheckoutForm = ({ userId, name, price }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    //user/buyer card infos
    const cardElement = elements.getElement(CardElement);

    const stripeRespose = await stripe.createToken(cardElement, {
      name: userId,
    });
    // console.log(stripeRespose);

    const stripeToken = stripeRespose.token.id;

    const response = await axios.post("http://localhost:3000/payment", {
      stripeToken,
      name,
      price,
    });
    console.log("response here:", response.data.response.status);

    if (response.data.response.status === "succeeded") {
      console.log("SUCCES HERE!!");
      setCompleted(true);
    }
    console.log(completed);
  };
  return (
    <div className="checkout-form">
      {!completed ? (
        <form onSubmit={handleSubmit} action="">
          <CardElement />
          <button type="submit">Valider</button>
        </form>
      ) : (
        <span>Paiement effectué!</span>
      )}
    </div>
  );
};

export default CheckoutForm;
