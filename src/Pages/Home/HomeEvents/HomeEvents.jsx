import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SingleHomeEvent from "./SingleHomeEvent";
import LoadingButton from "../../../Components/LoadingButton";

const HomeEvents = () => {
  const axiosPubic = useAxiosPublic();
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosPubic.get("/events");
      return res.data;
    },
  });
  return (
    <div>
      <div className="max-w-screen-lg mx-auto  my-20">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10">
          {isLoading ? (
            <LoadingButton />
          ) : (
            events.map((event) => (
              <SingleHomeEvent key={event._id} event={event}></SingleHomeEvent>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeEvents;
