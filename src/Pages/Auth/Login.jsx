import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const Login = () => {
  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { signInUser } = useAuth();

  const onSubmit = (data) => {
    signInUser(data.email, data.password).then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `User Login Successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(from, { replace: true });
    });
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className=" flex justify-center items-center">
        <div className="w-96 p-4 mt-28 mb-10">
          <h2 className="text-3xl text-center text-gray-400">Please Login</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text text-md text-gray-400"> Email</span>
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full "
                placeholder="Enter Your Password"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-800 mt-2">Email is required</span>
              )}
            </div>
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
            <input
              type="submit"
              className="input input-bordered w-full bg-primary text-white my-4"
              value="Login"
            />
          </form>

          <p className="text-gray-400">
            Don Not Have Any Account{" "}
            <Link to="/signup" className="text-red-500">
              Please Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
