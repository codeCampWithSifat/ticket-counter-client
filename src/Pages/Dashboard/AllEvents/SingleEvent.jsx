/* eslint-disable react/prop-types */
const SingleEvent = ({ event }) => {
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
  } = event;
  return (
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
      </div>
    </div>
  );
};

export default SingleEvent;
