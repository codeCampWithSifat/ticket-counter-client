import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SingleEvent from "./SingleEvent";
import LoadingButton from "../../../Components/LoadingButton";

const AllEvents = () => {
  const axiosPublic = useAxiosPublic();
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosPublic.get("/events");
      return res?.data;
    },
  });

  if (isLoading) {
    return <LoadingButton />;
  }
  return (
    <div className="mt-20">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 mx-16">
        {events?.map((event) => (
          <SingleEvent key={event._id} event={event}></SingleEvent>
        ))}
      </div>
    </div>
  );
};

export default AllEvents;
