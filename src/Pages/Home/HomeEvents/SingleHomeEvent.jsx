import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const SingleHomeEvent = ({ event }) => {
  console.log(event);
  const {
    image,
    eventName,
    district,
    address,
    date,
    price,
    seats,
    time,
    status,
    _id,
  } = event;
  return (
    <div>
      <div className="card   bg-base-100 shadow-xl">
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
        </div>
        <Link to={`/dashboard/eventDetails/${_id}`}>
          <div className="card-actions justify-end pb-2 mx-4 ">
            <div className="badge badge-outline bg-indigo-800 text-white">
              <span>More Info</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SingleHomeEvent;
