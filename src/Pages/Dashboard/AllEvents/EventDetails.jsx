import { Link, useLoaderData } from "react-router-dom";

const EventDetails = () => {
  const {
    address,
    date,
    district,
    eventName,
    image,
    message,
    price,
    seats,
    status,
    time,
    _id,
  } = useLoaderData();

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
          <Link to={`/dashboard/allEvent`}>
            <div className="card-actions justify-end pb-2 mx-4  mt-4">
              <div className="badge badge-outline bg-indigo-800 text-white">
                <span>Go To All Event</span>
              </div>
            </div>
          </Link>
          {status && status === "paid" ? (
            <Link to={`/dashboard/bookingPage/${_id}`}>
              <div className="card-actions justify-start pb-2 -mt-8">
                <div className="badge badge-outline bg-indigo-800 text-white">
                  <span>Book A Ticket</span>
                </div>
              </div>
            </Link>
          ) : (
            <Link to={`/dashboard/freeBookingPage/${_id}`}>
              <div className="card-actions justify-start pb-2 -mt-8">
                <div className="badge badge-outline bg-red-800 text-white">
                  <span>Book Free Ticket</span>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
