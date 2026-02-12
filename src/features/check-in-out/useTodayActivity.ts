import { useQuery } from "@tanstack/react-query";
import {
  // getStaysTodayActivity,
  // getStaysTodayActivityV2,
  getStaysTodayActivityV3,
} from "../../services/apiBookings";

export function useTodayActivity() {
  const { data: activities, isLoading } = useQuery({
    queryFn: getStaysTodayActivityV3,
    queryKey: ["today-activity"],
  });

  return { activities, isLoading };
}
