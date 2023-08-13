import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export const useFetchBooking = () => {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId], // identifier
    queryFn: () => getBooking(bookingId),
    retry: false, // not retry if smth went wrong
  });

  return { booking, isLoading, error };
};
