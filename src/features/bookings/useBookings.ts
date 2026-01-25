import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export function useBookings() {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
    // select: (data) =>
    //   data.map((booking) => ({
    //     ...booking,
    //     cabins: booking.cabins[0] || { name: "" },
    //     guests: booking.guests[0] || { fullName: "", email: "" },
    //   })),
  });

  return { isLoading, bookings, error };
}
