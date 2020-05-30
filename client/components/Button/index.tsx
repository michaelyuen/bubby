import React from "react";
import { noop } from "../../utils/fn";
import { ButtonContainer } from "./style";

const Button = (prop: any) => {
  const { onClick = noop, children = "", ...rest } = prop;
  return (
    <ButtonContainer onClick={onClick} {...rest}>
      {children}
    </ButtonContainer>
  );
};
export default React.memo(Button);
