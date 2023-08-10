import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin, getCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useCreateCabin = () => {
  const queryCLient = useQueryClient();

  // react query logic
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryCLient.invalidateQueries({
        queryKey: ["cabins"],
        queryFn: getCabins,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isCreating,
    createCabin,
  };
};
