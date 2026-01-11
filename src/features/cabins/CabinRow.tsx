import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import { formatCurrency } from "../../utils/helpers";
import { deleteCabin } from "../../services/apiCabins";
import UpdateCabinForm from "./UpdateCabinForm";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

interface CabinRow {
  cabin: any;
}

export default function CabinRow({ cabin }: CabinRow) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate } = useMutation({
    // mutationFn: (id) => deleteCabin(id),
    mutationFn: deleteCabin,
    // Validation of data after deleting a cabin
    onSuccess: () => {
      // alert("Cabin successfully deleted");
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err: any) => toast.error(err.message),
  });

  function showUpdateFormHandler() {
    setShowUpdateForm((show) => !show);
  }

  return (
    <>
      {!showUpdateForm && (
        <TableRow role="row">
          <Img src={image} alt={name} />
          <Cabin>{name}</Cabin>
          <div>Fits up to {maxCapacity} guests</div>
          <Price>{formatCurrency(regularPrice)}</Price>
          <Discount>{formatCurrency(discount)}</Discount>
          <div>
            <button onClick={showUpdateFormHandler}>Edit</button>
            <button onClick={() => mutate(cabinId)} disabled={isDeleting}>
              {isDeleting ? "Deleting" : "Delete"}
            </button>
          </div>
        </TableRow>
      )}
      {showUpdateForm && (
        <UpdateCabinForm
          cabinToEdit={cabin}
          onShowUpdateFormHandler={showUpdateFormHandler}
        />
      )}
    </>
  );
}
