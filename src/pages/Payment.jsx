import { Navigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51OCNCYBfYc0X5OUortxMky9GBQ3akqZYNRYxtPpcpCURwETTJbpgQV0yHwK4sv80JKAwnBukoH8f57NPi8SZglpm00StuXMw1w"
);
const Payment = ({ token, userId }) => {
  const location = useLocation();
  console.log(location.state);
  const { productId, name, price, description } = location.state;

  console.log("ecco");
  return token ? (
    <main className="payment-container">
      <div className="payment-card">
        <div className="sumup">
          <h3>Resumé de la commande</h3>

          <div>
            <span>Commande</span>
            <span>{price.toFixed(2)} €</span>
          </div>
          <div>
            <span>Frais protection acheteurs</span>
            <span>0.40 €</span>
          </div>
          <div>
            <span>Frais de port</span>
            <span>0.80 €</span>
          </div>
        </div>
        <div className="total">
          <span className="font-bold">Total</span>
          <span className="font-bold">{price + 0.4 + 0.8} €</span>
        </div>

        <div className="next-step">
          <p>
            Il ne vous reste plus qu'une étape pour vous offir
            <span className="font-bold"> {name}</span>. Vous allez payer
            <span className="font-bold"> {price + 0.4 + 0.8} € </span>(frais de
            protection et frais d eport inclus).
          </p>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            userId={userId}
            price={price}
            name={name}
            productId={productId}
          />
        </Elements>
      </div>
    </main>
  ) : (
    <Navigate to="/" />
  );
};
export default Payment;
