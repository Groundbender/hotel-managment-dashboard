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
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false, // определяет, будет ли повторяться запрос при возникновении ошибки. Если retry установлен в true, то запрос будет повторяться автоматически при возникновении ошибки. Если установлено в false, то запрос не будет повторяться.
  });

  return { booking, isLoading, error };
};
