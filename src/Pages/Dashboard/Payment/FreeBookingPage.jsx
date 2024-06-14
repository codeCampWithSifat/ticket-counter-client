import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";

const FreeBookingPage = () => {
  const {
    address,
    date,
    district,
    eventName,
    message,
    price,
    seats,
    status,
    time,
    _id,
    image,
  } = useLoaderData();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { handleSubmit, reset } = useForm();

  const onSubmit = async () => {
    const bookInfo = {
      email: user?.email,
      userName: user?.displayName,
      address,
      date,
      district,
      eventName,
      image,
      time,
      eventId: _id,
      bookingStatus: status,
      price,
      paymentStatus: "Free",
    };

    const bookingResponse = await axiosSecure.post("/payments", bookInfo);
    if (bookingResponse?.data?.insertedId) {
      reset();
      navigate("/dashboard/getMyTicket");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Booked Your Ticket",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="flex justify-center items-center h-[800px] mt-10">
      <div className="card w-1/2 bg-base-100 shadow-xl flex ">
        <figure>
          <img src={image} alt="Shoes" />
        </figure>

        <div className="card-body">
          <h2 className="card-title">Singer : {eventName}</h2>
          <p>District : {district}</p>
          <p>Location : {address}</p>
          <p>Date : {date}</p>
          <p>Ticket Price : {price} Taka</p>
          <p>Available Seats : {seats}</p>
          <p>Concert Time : {time}</p>
          <p>Status : {status.toUpperCase()}</p>
          <p>Messsage : {message}</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <button className="btn btn-sm btn-primary text-white">
              Book Your Seat
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FreeBookingPage;
