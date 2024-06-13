import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data = {} } = useQuery({
    queryKey: ["singleBookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/singleBookings?email=${user?.email}`);
      console.log(res);
      return res.data;
    },
  });

  const totalPrice = data?.totalPrice || 1;

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

        const payment = {
          name: user?.displayName,
          email: user?.email,
          address: data?.address,
          bookingStatus: data?.bookingStatus,
          date: data?.date,
          district: data?.district,
          eventId: data?.eventId,
          eventName: data?.eventName,
          image: data?.image,
          paymentStatus: "Done",
          price: data?.price,
          quantity: data?.quantity,
          time: data?.time,
          totalPrice: data?.totalPrice,
          transactionId: paymentIntent.id,
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
        You Have To Pay {totalPrice} For Ticket Taka For {data?.quantity} Ticket
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
