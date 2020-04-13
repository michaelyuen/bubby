import React from "react";
import { noop } from "utils/fn";
import { InputContainer } from "./style";

interface Props {
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  style?: {
    [key: string]: string;
  };
  type?: string;
  value?: string;
}

const Input: React.FC<Props> = ({
  name = "",
  onChange = noop,
  onKeyPress = noop,
  placeholder = "",
  type = "text",
  value,
  ...rest
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <InputContainer>
      {name}
      <br />
      <input
        placeholder={placeholder}
        onChange={handleChange}
        onKeyPress={onKeyPress}
        value={value}
        {...rest}
        data-lpignore="true"
      />
    </InputContainer>
  );
};
export default Input;
