import React from "react";
import styled from "styled-components";

interface IInput {
  fieldType: string;
  name?: string;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  error?: string;
}

const StyledInput = styled.input<{ error?: string }>`
  padding: 10px;
  margin-top: 15px;
  outline: none;
  :foces : {
    outline: none;
  }
  border: ${(props) => (props.error ? "1px solid red" : "1px solid black")};
`;

const Input = ({
  fieldType,
  value,
  onChange,
  placeholder,
  name,
  setValue,
  error,
}: IInput) => {
  const changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setValue) {
      setValue(e.target.value);
    }
  };
  return (
    <StyledInput
      name={name}
      value={value}
      type={fieldType}
      onChange={setValue ? changeValueHandler : onChange}
      maxLength={26}
      placeholder={placeholder}
      error={error}
    />
  );
};

export default Input;
