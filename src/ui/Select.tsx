import type { ChangeEvent } from "react";
import styled from "styled-components";

type StyledSelectTypes = "white";
interface StyledSelectProps {
  type: StyledSelectTypes;
}

interface SelectProps {
  options: { value: string; label: string }[];
  value: string;
  type: StyledSelectTypes;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const StyledSelect = styled.select<StyledSelectProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

export default function Select({
  options,
  value,
  type,
  onChange,
}: SelectProps) {
  return (
    <StyledSelect type={type} value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}
