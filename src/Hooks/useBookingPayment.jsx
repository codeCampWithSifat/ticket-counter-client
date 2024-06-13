import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useBookingPayment = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user?.email}`);
      return res?.data;
    },
  });
  return [bookings, refetch, isLoading];
};

export default useBookingPayment;
