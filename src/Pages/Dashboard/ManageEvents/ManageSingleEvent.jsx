/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
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

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const handleDeleteEvent = () => {
    Swal.fire({
      title: `Are you sure?  ${user.displayName}`,
      text: "You Want To Delete This Menu Item",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/events/${_id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Event has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
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
            <Link to={`/dashboard/manageEventsDetails/${_id}`}>
              <button className="btn btn-secondary btn-sm">More Info</button>
            </Link>
            <Link to={`/dashboard/editManageEvents/${_id}`}>
              <button className="btn btn-primary btn-sm">Edit</button>
            </Link>
            <button
              onClick={() => handleDeleteEvent(_id)}
              className="btn btn-error btn-sm text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSingleEvent;
