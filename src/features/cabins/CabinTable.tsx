import { useSearchParams } from "react-router-dom";
import { useFetchCabins } from "./useFetchCabins";
import type { CabinFromApiType } from "../../types/cabinTypes";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, cabins } = useFetchCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins?.length) return <Empty resourceName="cabins" />;

  // 1) FILTER
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins?.filter(
      (cabin: CabinFromApiType) => cabin.discount === 0
    );
  if (filterValue === "with-discount")
    filteredCabins = cabins?.filter(
      (cabin: CabinFromApiType) => cabin.discount > 0
    );

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body<CabinFromApiType>
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
