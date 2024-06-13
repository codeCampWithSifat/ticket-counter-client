import { Elements } from "@stripe/react-stripe-js";
import useAuth from "../../../Hooks/useAuth";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
const Payment = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2 className="text-center text-indigo-600 text-2xl font-bold mt-8">
        Hey {user?.displayName} Welcome To Your Payment Dashboard
      </h2>
      <div className="max-w-screen-sm mx-auto mt-10">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
