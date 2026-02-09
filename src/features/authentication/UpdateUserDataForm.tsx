import { useState, type FormEvent, ChangeEvent } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  const { user } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const currentFullName = user?.user_metadata?.fullName || "";
  const userEmail = user?.email || "";

  const [fullName, setFullName] = useState<string>(currentFullName);
  const [avatar, setAvatar] = useState<File | null>(null);

  function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setAvatar(file);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setFullName(currentFullName);
          setAvatar(null);
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={userEmail} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          disabled={isUpdating}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          onChange={handleAvatarChange}
        />
      </FormRow>
      <FormRow>
        <>
          <Button
            type="reset"
            variation="secondary"
            size="medium"
            disabled={isUpdating}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button variation="primary" size="medium" disabled={isUpdating}>
            {!isUpdating ? "Update account" : <SpinnerMini />}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
