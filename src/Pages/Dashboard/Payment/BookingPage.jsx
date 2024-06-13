import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const BookingPage = () => {
  const {
    address,
    date,
    district,
    eventName,
    image,
    price,
    seats,
    status,
    time,
    _id,
  } = useLoaderData();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
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
      paymentStatus: "pending",
      quantity: Number(data.quantity),
      totalPrice: Number(data.quantity * price),
    };

    const bookingResponse = await axiosSecure.post("/bookings", bookInfo);
    if (bookingResponse?.data?.insertedId) {
      reset();
      navigate("/dashboard/payment");
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
    <div className="flex justify-center items-center mt-4">
      <div className="card w-96 bg-base-100 shadow-xl flex ">
        <figure>
          <img src={image} alt="Shoes" />
        </figure>

        <div className="card-body">
          <h2 className="card-title">Singer : {eventName}</h2>
          <p>District : {district}</p>
          <p>Location : {address}</p>
          <p>Date : {date}</p>
          <p>Per Ticket Price : {price} Taka</p>
          <p>Available Seats : {seats}</p>
          <p>Concert Time : {time}</p>
          <div className="text-center">
            <p className="text-center font-bold text-indigo-800 mt-2">
              How Much Ticket You Need ?
            </p>
            <div className="flex justify-center items-center">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text text-md ">Ticket Quantity</span>
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    className="file-input file-input-bordered p-4 w-full "
                    {...register("quantity", {
                      required: true,
                      min: 1,
                    })}
                    placeholder="Enter Your Quantity"
                  />

                  {errors.quantity && (
                    <span className="text-red-800 mt-2">
                      Quantity Is Required and Must Be Count 1
                    </span>
                  )}
                </div>
                <button
                  className="btn btn-md mt-2  bg-indigo-600 text-white hover:bg-indigo-600 hover:text-black"
                  type="submit"
                >
                  Booked Ticket
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
