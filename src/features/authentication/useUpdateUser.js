import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin, getCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export const useUpdateUser = () => {
  const queryCLient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (user) => {
      toast.success("User account successfully updated");
      // queryCLient.setQueriesData("user", user);
      queryCLient.invalidateQueries({
        queryKey: ["user"],
        queryFn: getCabins,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    updateUser,
    isUpdating,
  };
};
