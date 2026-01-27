import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

type FilterMethod =
  | "eq"
  | "neq"
  | "gt"
  | "gte"
  | "lt"
  | "lte"
  | "like"
  | "ilike"
  | "in"
  | "is"
  | "fts"
  | "plfts"
  | "phfts"
  | "wfts";

export function useBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : // : { field: "status", value: filterValue };
        { field: "status", value: filterValue, method: "eq" as FilterMethod };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () => getBookings({ filter, sortBy: "" }),
  });

  return { isLoading, bookings, error };
}
