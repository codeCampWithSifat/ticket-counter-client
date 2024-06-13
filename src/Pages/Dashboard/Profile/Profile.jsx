import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import LoadingButton from "../../../Components/LoadingButton";

const Profile = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data, isLoading } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users?email=${user?.email}`);
      console.log(res);
      return res?.data;
    },
  });
  if (isLoading) {
    return <LoadingButton />;
  }
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={data?.avatar} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>Name : {data?.name}</p>
          <p>Email : {data?.email}</p>
          <p>Phone Number : {data?.phoneNumber}</p>
          <p>Blood Group : {data?.bloodGroup}</p>
          <div className="card-actions justify-end my-10">
            <button className="btn btn-sm btn-primary">
              Update Information
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
