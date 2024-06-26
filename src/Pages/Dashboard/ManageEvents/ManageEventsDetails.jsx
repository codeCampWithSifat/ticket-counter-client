import { Link, useLoaderData } from "react-router-dom";

const ManageEventsDetails = () => {
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
          <div>
            <Link to={`/dashboard/manageEvents`}>
              <button>Go All Event</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageEventsDetails;
