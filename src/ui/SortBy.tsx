import { useSearchParams } from "react-router-dom";
import type { ChangeEvent } from "react";
import Select from "./Select";

interface SortByProps {
  options: {
    value: string;
    label: string;
  }[];
}

export default function SortBy({ options }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      value={sortBy}
      type={"white"}
      onChange={handleChange}
    />
  );
}
