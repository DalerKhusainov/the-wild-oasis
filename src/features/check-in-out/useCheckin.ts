import { useNavigate } from "react-router-dom";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

interface CheckinParams {
  bookingId: number;
  breakfast?: {
    hasBreakfast?: boolean;
    extraPrice?: number;
    totalPrice?: number;
  };
}

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }: CheckinParams) =>
      updateBooking(Number(bookingId), {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked-in`);
      queryClient.invalidateQueries({ active: true } as InvalidateQueryFilters);
      navigate("/");
    },

    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkin, isCheckingIn };
}
