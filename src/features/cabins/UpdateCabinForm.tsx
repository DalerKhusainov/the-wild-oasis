import { styled } from "styled-components";
import type { CabinFromApiType } from "../../types/cabinTypes";
import FileInput from "../../ui/FileInput";
import Input from "../../ui/Input";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";

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
  cabin: CabinFromApiType;
  onShowUpdateFormHandler: () => void;
}

export default function UpdateCabinForm({
  cabin,
  onShowUpdateFormHandler,
}: UpdateCabinFormProps) {
  console.log(cabin);

  return (
    <Container>
      <H3>Edit cabin {cabin.name}</H3>
      <UpdateCabinFormStyled>
        <FormRow>
          <Label htmlFor="name">Cabin name</Label>
          <Input type="text" id="name" />
          {/* <Error>Error text</Error>           */}
        </FormRow>
        <FormRow>
          <Label htmlFor="maxCapacity">Maximum capacity</Label>
          <Input type="number" id="maxCapacity" />
          {/* <Error>Error text</Error>           */}
        </FormRow>
        <FormRow>
          <Label htmlFor="regularPrice">Regular price</Label>
          <Input type="number" id="regularPrice" />
          {/* <Error>Error text</Error>           */}
        </FormRow>
        <FormRow>
          <Label htmlFor="discount">Discount</Label>
          <Input type="number" id="discount" />
          {/* <Error>Error text</Error>           */}
        </FormRow>
        <FormRow>
          <Label htmlFor="description">Description for website</Label>
          <Textarea id="description" />
          {/* <Error>Error text</Error>           */}
        </FormRow>
        <FormRow>
          <Label htmlFor="image">Cabin photo</Label>
          <FileInput accept="image/*" id="image" />
          {/* <Error>Error text</Error>           */}
        </FormRow>
        <ButtonsBox>
          <Button
            type="button"
            variation="danger"
            size="medium"
            onClick={onShowUpdateFormHandler}
          >
            Cancel
          </Button>
          <Button type="submit" variation="primary" size="medium">
            Save
          </Button>
        </ButtonsBox>
      </UpdateCabinFormStyled>
    </Container>
  );
}
