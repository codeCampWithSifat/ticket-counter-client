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

          <div className="card-actions justify-end pb-2 mx-4  mt-4">
            <Link to="/dashboard/allEvent">
              <div>
                <button className="btn btn-primary btn-sm">Go All Event</button>
              </div>
            </Link>
          </div>

          {status && status === "paid" ? (
            <div>
              <div className="-mt-12">
                <Link to={`/dashboard/bookingPage/${_id}`}>
                  <button className="btn btn-primary btn-sm">
                    Buy Your Ticket
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="-mt-12">
                <Link to={`/dashboard/freeBookingPage/${_id}`}>
                  <button className="btn btn-error text-white btn-primary btn-sm">
                    Get Your Free Ticket
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
