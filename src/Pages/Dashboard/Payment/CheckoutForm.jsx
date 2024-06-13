import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useBookingPayment from "../../../Hooks/useBookingPayment";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings] = useBookingPayment();
  const totalPrice = bookings?.reduce((sum, item) => sum + item.totalPrice, 0);
  const quantity = bookings?.map((item) => item.quantity);
  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: paymentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user.email,
            name: user.displayName,
          },
        },
      });

    if (paymentError) {
      console.log(paymentError);
    } else {
      console.log("paymentIntent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);
        // sent data to the server
        const payment = {
          email: user?.email,
          name: user?.displayName,
          transactionId: paymentIntent.id,
          address: bookings.map((item) => item.address),
          date: bookings.map((item) => item.date),
          district: bookings.map((item) => item.district),
          eventName: bookings.map((item) => item.eventName),
          image: bookings.map((item) => item.image),
          time: bookings.map((item) => item.time),
          eventId: bookings.map((item) => item.eventId),
          price: bookings.map((item) => item.price),
          quantity: bookings.map((item) => item.quantity),
          totalPrice: bookings.map((item) => item.totalPrice),
        };

        const res = await axiosSecure.post("/payments", payment);
        console.log(res);
        if (res.data?.insertedId) {
          navigate("/dashboard/dashboardHome");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.displayName} Your Payment Successfull`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  };
  return (
    <div>
      <h2 className="text-center text-indigo-600 text-2xl font-bold mt-8">
        You Have To Pay {totalPrice} For Ticket Taka For {quantity} Ticket
      </h2>
      <div className="mt-10">
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            type="submit"
            className="btn btn-sm btn-primay text-white bg-indigo-600 hover:bg-indigo-600 mt-4"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
        </form>
        <p className="text-red-700 mt-4">{error}</p>
        {transactionId && (
          <p className="text-green-600 mt-3">
            {" "}
            Your transaction id: {transactionId}
          </p>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
