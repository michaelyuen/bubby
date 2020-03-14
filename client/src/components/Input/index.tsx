import React from "react";
import { noop } from "utils/fn";
import { InputContainer } from "./style";

export default function Input(prop: any) {
  const { placeholder = "", name = "", onChange = noop, ...rest } = prop;
  return (
    <InputContainer>
      {name}
      <br />
      <input
        placeholder={placeholder}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        {...rest}
        data-lpignore="true"
      />
    </InputContainer>
  );
}
