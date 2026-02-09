import { SubmitHandler, useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";

import { useUpdateUser } from "./useUpdateUser";

interface UpdatePasswordFormType {
  password: string;
  passwordConfirm: string;
}

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } =
    useForm<UpdatePasswordFormType>();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  const onSubmit: SubmitHandler<UpdatePasswordFormType> = ({ password }) => {
    updateUser({ password }, { onSuccess: () => reset() });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="New password (min 8 chars)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <>
          <Button
            onClick={() => reset()}
            type="reset"
            variation="secondary"
            size="medium"
          >
            Cancel
          </Button>
          <Button variation="primary" size="medium" disabled={isUpdating}>
            {!isUpdating ? "Update password" : <SpinnerMini />}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
