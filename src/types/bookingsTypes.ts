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

export interface BookingDetailType {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extraPrice: number;
  totalPrice: number;
  status: string;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabinID: number;
  guestID: number;
  cabins: Cabins;
  guests: Guests;
}

export interface Cabins {
  id: number;
  name: string;
  image: string;
  discount: number;
  created_at: string;
  description: string;
  maxCapacity: number;
  regularPrice: number;
}

export interface Guests {
  id: number;
  email: string;
  fullName: string;
  created_at: string;
  nationalID: string;
  countryFlag: string;
  nationality: string;
}

export interface BookingsStatsType {
  created_at: string;
  totalPrice: number;
  extraPrice: number;
}

export interface BookingsConfirmedStaysType {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extraPrice: number;
  totalPrice: number;
  status: string;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: any;
  cabinID: number;
  guestID: number;
  guests: {
    fullName: string;
  };
}
