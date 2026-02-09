import { SubmitHandler, useForm } from "react-hook-form";
import { useSignup } from "./useSignup";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

interface AddUserFormInputsTypes {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

function SignupForm() {
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddUserFormInputsTypes>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const { signup, isSigningup } = useSignup();

  const onSubmit: SubmitHandler<AddUserFormInputsTypes> = (data) => {
    const { fullName, email, password } = data;
    signup({ fullName, email, password }, { onSettled: () => reset() });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isSigningup}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isSigningup}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isSigningup}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "The password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSigningup}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        <>
          {/* type is an HTML attribute! */}
          <Button
            variation="secondary"
            size="medium"
            type="reset"
            disabled={isSigningup}
            onClick={() => reset()}
          >
            Cancel
          </Button>
          <Button variation="primary" size="medium" disabled={isSigningup}>
            {!isSigningup ? "Create new user" : <SpinnerMini />}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
