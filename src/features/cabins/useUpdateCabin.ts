import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { CabinType } from "../../types/cabinTypes";
import { toast } from "react-hot-toast";

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabin, id }: { newCabin: CabinType; id: number }) =>
      createEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      //   reset();
      //   onShowUpdateFormHandler();
    },
    onError: (err) => {
      if (err instanceof Error) toast.error(err.message);
    },
  });

  return { editCabin, isEditing };
}
