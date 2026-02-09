import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: ({
      password,
      fullName,
      avatar,
    }: {
      password?: string;
      fullName?: string;
      avatar?: File | null;
    }) => updateCurrentUser({ password, fullName, avatar }),

    onSuccess: () => {
      toast.success("User account successfully updated");
      //   queryClient.setQueriesData("user", user)
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },

    onError: (err) => {
      if (err instanceof Error) toast.error(err.message);
    },
  });

  return { updateUser, isUpdating };
}
