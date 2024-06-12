import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "../../Components/LoadingButton";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const imageBB_Upload_Key = import.meta.env.VITE_imageBB_Upload_Secret;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imageBB_Upload_Key}`;

const SignUp = () => {
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserName, loading } = useAuth();
  //   const onSubmit = async (data) => {
  //     if (data.password !== data.confirmPassword) {
  //       return setPasswordError("Password/ConfirmPassword Not Matched");
  //     }
  //     const formData = new FormData();
  //     const imageFile = { image: data.image[0] };
  //     formData.append("file", imageFile);
  //     const res = await axiosPublic.post(image_hosting_api, imageFile, {
  //       headers: {
  //         "content-type": "multipart/form-data",
  //       },
  //     });

  //     const imageResponse = res.data?.data?.display_url;

  //     createUser(data.email, data.password)
  //       .then(() => {
  //         updateUserProfile(data.name, imageResponse ? imageResponse : data.image)
  //           .then(async () => {
  //             const userInfo = {
  //               name: data.name,
  //               email: data.email,
  //               avatar: imageResponse,
  //               bloodGroup: data.bloodGroup,
  //               district: data.district,
  //               upazila: data.upazila,
  //               status: "active",
  //               role: "donor",
  //             };

  //             const userResponse = await axiosPublic.post(`/users`, userInfo);
  //             if (userResponse.data.insertedId) {
  //               reset();
  //               Swal.fire({
  //                 position: "top-end",
  //                 icon: "success",
  //                 title: `${data.name} Sign Up Successfully`,
  //                 showConfirmButton: false,
  //                 timer: 1500,
  //               });
  //               navigate("/");
  //             }
  //           })
  //           .catch((error) => {
  //             console.log(error);
  //           });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });

  //     setPasswordError("");
  //   };

  const onSubmit = (data) => {
    console.log(data);
    if (data.password !== data.confirmPassword) {
      return setPasswordError("Password/ConfirmPassword Not Matched");
    }
  };
  return (
    <>
      <Helmet>
        <title>SignUp</title>
      </Helmet>
      <div className=" flex justify-center items-center">
        <div className="w-1/2 p-4 mt-28 mb-20">
          <h2 className="text-3xl text-center text-gray-400">
            Please Register{" "}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
            <div className="flex">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text text-md text-gray-400 ">
                    {" "}
                    Your Name
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  className="input input-bordered w-full "
                  placeholder="Enter Your Name"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-800 mt-2">Name is required</span>
                )}
              </div>
              <div className="form-control w-full ml-10">
                <label className="label">
                  <span className="label-text text-md text-gray-400">
                    {" "}
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="input input-bordered w-full "
                  placeholder="Enter Your Email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-800 mt-2">Email is required</span>
                )}
              </div>
            </div>
            <div className="flex mt-6">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text text-md text-gray-400">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  name="password"
                  className="input input-bordered w-full "
                  placeholder="Enter Your Password"
                  {...register("password", {
                    required: true,
                    minLength: 5,
                    maxLength: 20,
                  })}
                />
                {errors.password && (
                  <span className="text-red-800 mt-2">
                    Password Minimun 5 Character Or Maximum 20 Character
                  </span>
                )}
              </div>
              <div className="form-control w-full ml-10 ">
                <label className="label">
                  <span className="label-text text-md text-gray-400">
                    Confirm Password
                  </span>
                </label>
                <input
                  type="password"
                  name="password"
                  className="input input-bordered w-full "
                  placeholder="Enter Your Confirm Password"
                  {...register("confirmPassword", {
                    required: true,
                    minLength: 5,
                    maxLength: 20,
                  })}
                />
                {errors.confirmPassword && (
                  <span className="text-red-800 mt-2">
                    Password Minimun 5 Character Or Maximum 20 Character
                  </span>
                )}
                {passwordError && (
                  <span className="text-red-800 mt-2">
                    Password/ConfirmPassword Not Matched
                  </span>
                )}
              </div>
            </div>

            <div className="flex mt-6">
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

              <div className="form-control w-full ml-10">
                <div>
                  <label className="form-control w-full ">
                    <div className="label">
                      <span className="label-text text-gray-400">
                        Select Your Blood Group
                      </span>
                    </div>
                    <select
                      {...register("bloodGroup", { required: true })}
                      className="select select-bordered"
                    >
                      <option selected disabled>
                        Select One
                      </option>
                      <option value={"A+"}>A+</option>
                      <option value={"A-"}>A-</option>
                      <option value={"B+"}>B+</option>
                      <option value={"B-"}>B-</option>
                      <option value={"AB+"}>AB+</option>
                      <option value={"AB-"}>AB-</option>
                      <option value={"O+"}>O+</option>
                      <option value={"O-"}>O-</option>
                    </select>
                  </label>
                </div>
                <div></div>
              </div>
            </div>

            <div className="flex mt-6">
              <div className="form-control w-full">
                <div>
                  <label className="form-control w-full ">
                    <div className="label">
                      <span className="label-text text-gray-400">
                        Your Phone Number
                      </span>
                    </div>
                    <input
                      {...register("phoneNumber", { required: true })}
                      className="input input-bordered"
                      placeholder="Enter Your Phone Number"
                    ></input>
                  </label>
                </div>
              </div>
            </div>

            <input
              type="submit"
              className="input input-bordered w-1/4 bg-primary text-white my-4"
              value="Register"
              disabled={loading && <LoadingButton />}
            />
          </form>

          <p>
            <span className="text-gray-400 mx-2">Already Have An Account</span>
            <Link to="/login" className="text-red-500">
              Please Login
            </Link>
          </p>
        </div>
      </div>
      ;
    </>
  );
};

export default SignUp;
