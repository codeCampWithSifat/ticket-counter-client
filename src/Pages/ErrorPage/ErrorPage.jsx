import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        <h2 className="text-red-800 text-4xl">Something Went Wrong</h2>
        <div className="text-center mt-10">
          <Link to={"/"}>
            <button className="btn btn-error text-white">Go To Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
