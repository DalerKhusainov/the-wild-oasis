import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
// import { SubmitErrorHandler } from "react-hook-form";
import type { AddCabinFormInputsTypes } from "../../types/cabinTypes";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import FileInput from "../../ui/FileInput";

const FormButtonRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<AddCabinFormInputsTypes>();

  const { createCabin, isCreating } = useCreateCabin();

  const onSubmit: SubmitHandler<AddCabinFormInputsTypes> = (data) => {
    createCabin(
      { ...data, image: data.image[0] },
      {
        onSuccess: (data) => {
          console.log(data);
          reset();
        },
      }
    );
  };

  // const onError: SubmitErrorHandler<AddCabinFormInputsTypes> = (errors) => {
  //   console.log(errors);
  // };

  return (
    // <Form onSubmit={handleSubmit(onSubmit, onError)}>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Price should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          disabled={isCreating}
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          accept="image/*"
          id="image"
          disabled={isCreating}
          {...register("image", { required: "This field is required" })}
        />
      </FormRow>

      <FormButtonRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" size="medium" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating} variation="primary" size="medium">
          {isCreating ? "Creating" : "Add Cabin"}
        </Button>
      </FormButtonRow>
    </Form>
  );
}

export default CreateCabinForm;
