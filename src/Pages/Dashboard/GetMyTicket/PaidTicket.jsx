/* eslint-disable react/prop-types */
const PaidTicket = ({ ticket }) => {
  console.log(ticket);
  const { image, time, eventName, price, quantity, name } = ticket;
  return (
    <div className="flex justify-center items-center mx-4 ">
      <div className="card w-96 bg-base-100 shadow-xl flex ">
        <figure>
          <img src={image} alt="Shoes" />
        </figure>

        <div className="card-body">
          <h2 className="card-title">Singer : {eventName}</h2>
          <p>Holder : {name}</p>
          <p>Ticket Price : {price} Taka</p>
          <p>Quantity : {quantity}</p>
          <p>Concert Time : {time}</p>

          <button className="btn btn-sm btn-primary text-white">
            Book Your Seat
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaidTicket;
