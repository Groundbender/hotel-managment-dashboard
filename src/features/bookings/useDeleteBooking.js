import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import {
  deleteBooking as deleteBookingApi,
  getBookings,
} from "../../services/apiBookings";

export const useDeleteBooking = () => {
  const queryCLient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Booking successfully deleted");
      queryCLient.invalidateQueries({
        queryKey: ["bookings"], // invalidating cache to renew it
        queryFn: getBookings,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isDeleting,
    deleteBooking,
  };
};
