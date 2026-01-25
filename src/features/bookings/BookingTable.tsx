import type {
  BookingsFromApiType,
  BookingFromApiType,
} from "../../types/bookingsTypes";
import { useBookings } from "./useBookings";

import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";

function BookingTable() {
  // const bookings: BookingsFromApiType = [
  //   {
  //     id: 1,
  //     created_at: "",
  //     startDate: "",
  //     endDate: "",
  //     numNights: 3,
  //     numGuests: 4,
  //     cabinPrice: 500,
  //     extrasPrice: 100,
  //     totalPrice: 600,
  //     status: "",
  //     hasBreakfast: true,
  //     isPaid: true,
  //     observations: "unconfirmed",
  //     cabinID: 4,
  //     guestID: 6,
  //   },
  //   {
  //     id: 2,
  //     created_at: "",
  //     startDate: "",
  //     endDate: "",
  //     numNights: 3,
  //     numGuests: 4,
  //     cabinPrice: 500,
  //     extrasPrice: 100,
  //     totalPrice: 600,
  //     status: "",
  //     hasBreakfast: true,
  //     isPaid: true,
  //     observations: "unconfirmed",
  //     cabinID: 4,
  //     guestID: 6,
  //   },
  // ];

  const { isLoading, bookings, error } = useBookings();

  if (isLoading) return <Spinner />;
  if (!bookings?.length) return <Empty resourceName="bookings" />;

  console.log();

  // const testBooking = bookings.map((booking) => ({
  //   ...booking,
  //   cabinName: [...booking.cabins],
  //   guest: [...booking.guests],
  // }));

  // console.log(testBooking);

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body<BookingFromApiType>
          data={bookings}
          render={(booking: BookingFromApiType) => (
            <BookingRow key={booking?.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
