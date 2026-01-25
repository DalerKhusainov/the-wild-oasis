export type BookingsFromApiType = BookingFromApiType[];

export type BookingFromApiType = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  status: string;
  totalPrice: number;
  cabins: { name: string };
  guests: { fullName: string; email: string };
};

// interface Cabins {
//   name: string;
// }

// interface Guests {
//   fullName: string;
//   email: string;
// }
