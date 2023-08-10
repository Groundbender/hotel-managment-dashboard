import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin, getCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

export const useEditCabin = () => {
  const queryCLient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("New cabin successfully edited");
      queryCLient.invalidateQueries({
        queryKey: ["cabins"],
        queryFn: getCabins,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    editCabin,
    isEditing,
  };
};
