import React from "react";
import { noop } from "utils/fn";
import { FormContainer } from "./style";

export default function Form(prop: { onSubmit?: Function; children?: any }) {
  const { onSubmit = noop, children = "" } = prop;
  return (
    <FormContainer onSubmit={(e: React.FormEvent) => onSubmit(e)}>
      {children}
    </FormContainer>
  );
}
