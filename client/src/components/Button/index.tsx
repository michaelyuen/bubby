import React from "react";
import { noop } from "utils/fn";
import { ButtonContainer } from "./style";

export default function Button(prop: any) {
  const { onClick = noop, children = "", ...rest } = prop;
  return (
    <ButtonContainer onClick={onClick} {...rest}>
      {children}
    </ButtonContainer>
  );
}
