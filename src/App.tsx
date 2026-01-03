import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Heading from "./ui/Heading";

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

export default function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as="h1">Wild Oasis</Heading>
        <Button variation="danger" size="small">
          Check In
        </Button>
      </StyledApp>
    </>
  );
}
