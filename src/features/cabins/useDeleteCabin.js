import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteCabin as deleteCabinApi,
  getCabins,
} from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useDeleteCabin = () => {
  const queryCLient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryCLient.invalidateQueries({
        queryKey: ["cabins"], // invalidating cache to renew it
        queryFn: getCabins,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isDeleting,
    deleteCabin,
  };
};
