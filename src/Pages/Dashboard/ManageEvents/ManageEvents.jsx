import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import LoadingButton from "../../../Components/LoadingButton";
import ManageSingleEvent from "./ManageSingleEvent";

const ManageEvents = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: events = [],
    isLoading,
    refetch,
  } = useQuery({
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
    <div>
      <div className="mt-20">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 mx-16">
          {events?.map((event) => (
            <ManageSingleEvent
              key={event._id}
              refetch={refetch}
              event={event}
            ></ManageSingleEvent>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageEvents;
