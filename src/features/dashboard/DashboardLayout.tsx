import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";

import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useFetchCabins } from "../cabins/useFetchCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isBookingsLoading } = useRecentBookings();
  const {
    stays,
    confirmedStays,
    isLoading: isStaysLoading,
    numDays,
  } = useRecentStays();
  const { cabins, isLoading: isCabinsLoading } = useFetchCabins();

  if (isBookingsLoading || isStaysLoading || isCabinsLoading)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins?.length}
      />
      <div>Today's activity</div>
      <div>Chart stay durations</div>
      <div>Chart sale</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
