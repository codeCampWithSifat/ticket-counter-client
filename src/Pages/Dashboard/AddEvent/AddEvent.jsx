import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const imageBB_Upload_Key = import.meta.env.VITE_imageBB_Upload_Secret;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imageBB_Upload_Key}`;

const AddEvent = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const onSubmit = async (data) => {
    const formData = new FormData();
    const imageFile = { image: data.image[0] };
    formData.append("file", imageFile);
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    const imageResponse = res.data?.data?.display_url;
    const eventInfo = {
      addEvent: user?.email,
      eventName: data.eventName,
      district: data.district,
      date: data.date,
      address: data.address,
      message: data.message,
      time: data.time,
      image: imageResponse,
      price: Number(data.price),
      seats: Number(data.seats),
      status: data.status,
    };
    const eventResponse = await axiosSecure.post(`/events`, eventInfo);
    if (eventResponse.data.insertedId) {
      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Add An Event By ${user?.displayName}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div>
      <Helmet>
        <title>Add Event</title>
      </Helmet>
      <div className="max-w-screen-md mx-auto">
        <h2 className="mx-10 my-10 text-center text-indigo-800 text-2xl font-bold">
          Add Event
        </h2>
        <div className="w-full px-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex my-4">
              <div className="form-control w-full mr-4 ">
                <label className="label">
                  <span className="label-text font-semibold">Event Name *</span>
                </label>
                <input
                  {...register("eventName", { required: true })}
                  className="input input-bordered"
                ></input>
              </div>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold">
                    Which District *
                  </span>
                </label>
                <select
                  type="text"
                  {...register("district", { required: true })}
                  placeholder="Type here"
                  className="select select-bordered"
                >
                  <option selected disabled>
                    Pick One
                  </option>
                  <option value={"narayangonj"}>Narayangonj</option>
                  <option value={"gazipur"}>Gazipur</option>
                  <option value={"shrinagor"}>Shrinagor</option>
                  <option value={"lamonirhat"}>Lamonirhat</option>
                  <option value={"zindabazar"}>Zindabazar</option>
                  <option value={"doha"}>Doha</option>
                  <option value={"paharpur"}>Paharpur</option>
                  <option value={"paikgasa"}>Paikgasa</option>
                </select>
              </div>
            </div>

            <div className="flex my-4">
              <div className="form-control w-full mr-4">
                <label className="label">
                  <span className="label-text font-semibold">
                    Event Address *
                  </span>
                </label>
                <input
                  type="text"
                  {...register("address", { required: true })}
                  placeholder="Type here"
                  className="input input-bordered"
                ></input>
              </div>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold">Event Date *</span>
                </label>
                <input
                  type="date"
                  {...register("date", { required: true })}
                  className="input input-bordered"
                ></input>
              </div>
            </div>

            <div className="flex my-4">
              <div className="form-control w-full mr-4">
                <label className="label">
                  <span className="label-text font-semibold">Event Time *</span>
                </label>
                <input
                  type="time"
                  {...register("time", { required: true })}
                  placeholder="Type here"
                  className="input input-bordered"
                ></input>
              </div>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold">Message *</span>
                </label>
                <textarea
                  type="text"
                  {...register("message", { required: true })}
                  className="input input-bordered"
                ></textarea>
              </div>
            </div>

            <div className="flex my-4">
              <div className="form-control w-1/2 mr-4">
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text text-md text-gray-400">
                      Select Your Image
                    </span>
                  </label>
                  <input
                    type="file"
                    name="image"
                    className="file-input file-input-bordered file-input-primary w-full "
                    {...register("image", {
                      required: true,
                    })}
                  />

                  {errors.image && (
                    <span className="text-red-800 mt-2">Image Is Required</span>
                  )}
                </div>
              </div>
              <div className="form-control w-1/2 mr-4">
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text text-md text-gray-400">
                      Price
                    </span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    className="file-input file-input-bordered  w-full "
                    {...register("price", {
                      required: true,
                    })}
                  />

                  {errors.price && (
                    <span className="text-red-800 mt-2">Price Is Required</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex my-4">
              <div className="form-control w-1/2 mr-4">
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text text-md text-gray-400">
                      Available Seats
                    </span>
                  </label>
                  <input
                    type="number"
                    name="seats"
                    className="file-input file-input-bordered  w-full "
                    {...register("seats", {
                      required: true,
                    })}
                  />

                  {errors.seats && (
                    <span className="text-red-800 mt-2">Seats Is Required</span>
                  )}
                </div>
              </div>
              <div className="form-control w-1/2 mr-4">
                <div className="form-control w-full ">
                  <label className="label">
                    <span className="label-text text-md text-gray-400">
                      Concert Status
                    </span>
                  </label>
                  <select
                    type="text"
                    name="status"
                    className="select select-bordered"
                    {...register("status", {
                      required: true,
                    })}
                  >
                    <option selected disabled>
                      Pick One
                    </option>
                    <option value={"paid"}>Paid</option>
                    <option value={"free"}>Free</option>
                  </select>

                  {errors.status && (
                    <span className="text-red-800 mt-2">
                      Status Is Required
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              className="btn btn-md mt-2  bg-indigo-600 text-white hover:bg-indigo-600 hover:text-black"
              type="submit"
            >
              Create event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
