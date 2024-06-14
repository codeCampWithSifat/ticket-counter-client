import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingButton from "../../../Components/LoadingButton";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PaidTicket from "./PaidTicket";
import FreeTicket from "./FreeTicket";

const GetMyTicket = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data = [], isLoading } = useQuery({
    queryKey: ["getMyTickets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/getMyTicket?email=${user?.email}`);
      console.log(res);
      return res?.data;
    },
  });
  if (isLoading) {
    return <LoadingButton />;
  }

  const padiTicketUser = data.filter((user) => user.bookingStatus === "paid");
  const freeTicketUser = data.filter((user) => user.bookingStatus === "free");
  return (
    <div className="max-w-screen-lg mx-auto mt-16 text-center">
      <Tabs>
        <TabList>
          <Tab>Paid Ticket</Tab>
          <Tab>Free Ticket</Tab>
        </TabList>

        <TabPanel>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
            {padiTicketUser.map((ticket) => (
              <PaidTicket key={ticket._id} ticket={ticket} />
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
            {freeTicketUser.map((ticket) => (
              <FreeTicket key={ticket._id} ticket={ticket} />
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default GetMyTicket;
