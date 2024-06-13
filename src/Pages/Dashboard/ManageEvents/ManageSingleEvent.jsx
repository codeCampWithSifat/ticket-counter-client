/* eslint-disable react/prop-types */

/* eslint-disable no-unused-vars */
const ManageSingleEvent = ({ event, refetch }) => {
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
      <div>
        <div className="card  bg-base-100 shadow-xl">
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

          <div className="card-actions justify-center pb-2 mx-4 my-4 ">
            <button className="btn btn-primary btn-sm">Edit</button>
            <button className="btn btn-error btn-sm">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSingleEvent;
