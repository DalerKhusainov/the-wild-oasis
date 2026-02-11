import {
  HiOutlineBriefcase,
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import type {
  BookingsStatsType,
  BookingsConfirmedStaysType,
} from "../../types/bookingsTypes";
import { formatCurrency } from "../../utils/helpers";

import Stat from "./Stat";

interface StatsProps {
  bookings: BookingsStatsType[] | undefined;
  confirmedStays: BookingsConfirmedStaysType[] | undefined;
  numDays: number;
  cabinCount: number | undefined;
}

function Stats({ bookings, confirmedStays, numDays, cabinCount }: StatsProps) {
  const numBookings = bookings?.length;
  const sales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays?.length;

  const occupation =
    (confirmedStays ?? []).reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount!);

  return (
    <>
      <Stat
        title="Bookings"
        icon={<HiOutlineBriefcase />}
        color="blue"
        value={numBookings!}
      />
      <Stat
        title="Sales"
        icon={<HiOutlineBanknotes />}
        color="green"
        value={formatCurrency(sales!)}
      />
      <Stat
        title="Check ins"
        icon={<HiOutlineCalendarDays />}
        color="indigo"
        value={checkins!}
      />
      <Stat
        title="Occupancy rate"
        icon={<HiOutlineChartBar />}
        color="yellow"
        value={Math.round(occupation! * 100) + "%"}
      />
    </>
  );
}

export default Stats;
