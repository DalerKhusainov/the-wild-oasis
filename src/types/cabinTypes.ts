export type CabinsType = CabinType[];
export type CabinsFromApiType = CabinFromApiType[];

export type CabinType = {
  //   id: number;
  //   created_at: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: File;
};

export type CabinFromApiType = {
  id: number;
  created_at: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
};
