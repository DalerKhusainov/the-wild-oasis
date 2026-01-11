import { useForm, SubmitHandler } from "react-hook-form";
import { styled } from "styled-components";
import type {
  CabinFromApiType,
  UpdateCabinFormInputsTypes,
  CabinType,
} from "../../types/cabinTypes";
import { toast } from "react-hot-toast";
import FileInput from "../../ui/FileInput";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const UpdateCabinFormStyled = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const H3 = styled.h3`
  padding-left: 3rem;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: lighter;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  /* background-color: orangered; */
  padding: 0.5rem 3rem 1rem 3rem;
`;

const ButtonsBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  justify-self: stretch;
  padding-top: 3rem;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

interface UpdateCabinFormProps {
  cabinToEdit: CabinFromApiType;
  onShowUpdateFormHandler: () => void;
}

export default function UpdateCabinForm({
  cabinToEdit,
  onShowUpdateFormHandler,
}: UpdateCabinFormProps) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<UpdateCabinFormInputsTypes>({
    defaultValues: {
      name: editValues.name,
      maxCapacity: editValues.maxCapacity,
      regularPrice: editValues.regularPrice,
      discount: editValues.discount,
      description: editValues.description,
      image: editValues.image,
    },
  });

  const queryClient = useQueryClient();
  const { mutate, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabin, id }: { newCabin: CabinType; id: number }) =>
      createEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
      onShowUpdateFormHandler();
    },
  });

  const onSubmit: SubmitHandler<UpdateCabinFormInputsTypes> = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    mutate({ newCabin: { ...data, image }, id: editId });
  };

  return (
    <Container>
      <H3>Edit cabin {editValues.name}</H3>
      <UpdateCabinFormStyled onSubmit={handleSubmit(onSubmit)}>
        <FormRow>
          <Label htmlFor="name">Cabin name</Label>
          <Input
            type="text"
            id="name"
            disabled={isEditing}
            {...register("name", { required: "This field is required" })}
          />
          {/* <Error>Error text</Error>           */}
        </FormRow>
        <FormRow>
          <Label htmlFor="maxCapacity">Maximum capacity</Label>
          <Input
            type="number"
            id="maxCapacity"
            disabled={isEditing}
            {...register("maxCapacity", { required: "This field is required" })}
          />
          {/* <Error>Error text</Error>           */}
        </FormRow>
        <FormRow>
          <Label htmlFor="regularPrice">Regular price</Label>
          <Input
            type="number"
            id="regularPrice"
            disabled={isEditing}
            {...register("regularPrice", {
              required: "This field is required",
            })}
          />
          {/* <Error>Error text</Error>           */}
        </FormRow>
        <FormRow>
          <Label htmlFor="discount">Discount</Label>
          <Input
            type="number"
            id="discount"
            disabled={isEditing}
            {...register("discount", { required: "This field is required" })}
          />
          {/* <Error>Error text</Error>           */}
        </FormRow>
        <FormRow>
          <Label htmlFor="description">Description for website</Label>
          <Textarea
            id="description"
            disabled={isEditing}
            {...register("description", { required: "This field is required" })}
          />
          {/* <Error>Error text</Error>           */}
        </FormRow>
        <FormRow>
          <Label htmlFor="image">Cabin photo</Label>
          <FileInput
            accept="image/*"
            id="image"
            disabled={isEditing}
            {...register("image", {
              required: isEditSession ? false : "This field is required",
            })}
          />
          {/* <Error>Error text</Error>           */}
        </FormRow>
        <ButtonsBox>
          <Button
            variation="secondary"
            size="medium"
            type="reset"
            onClick={onShowUpdateFormHandler}
          >
            Cancel
          </Button>
          <Button disabled={isEditing} variation="primary" size="medium">
            {isEditing ? "Saving" : "Save"}
          </Button>
        </ButtonsBox>
      </UpdateCabinFormStyled>
    </Container>
  );
}
