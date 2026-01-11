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
  image: string | File;
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

export interface AddCabinFormInputsTypes {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList;
}

export interface UpdateCabinFormInputsTypes {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList | string;
}
