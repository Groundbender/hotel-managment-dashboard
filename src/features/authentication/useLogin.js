import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }), // login
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user); // prefetching or invalidating queries: setQueryData(["key"], data);

      navigate("/dashboard", { replace: true });
    },

    onError: (error) => {
      console.log("ERROR", error);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
};
