import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isPending: isCreating } = useMutation({
    // mutationFn: (newCabin) => createCabin(newCabin),
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      //   reset();
    },
    onError: (err) => {
      if (err instanceof Error) toast.error(err.message);
    },
  });

  return { isCreating, createCabin };
}
