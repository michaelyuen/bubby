import styled from "styled-components";
import {
  spacingDefault,
  colorSecondary,
  colorBackground,
  colorText,
  fontMedium
} from "style/themeFunctions";

export const InputContainer = styled.label`
  font-size: ${fontMedium};
  input {
    border: none;
    border-bottom: 1px solid ${colorSecondary};
    background: transparent;
    box-shadow: 0 0 0 1000px ${colorBackground} inset;
    -webkit-box-shadow: 0 0 0px 1000px ${colorBackground} inset;
    outline: none;
    padding: ${spacingDefault} 0;
    width: 100%;
    color: ${colorText} !important;
  }

  input::placeholder,
  input:-webkit-autofill,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    box-shadow: 0 0 0 1000px ${colorBackground} inset;
    -webkit-text-fill-color: ${colorText};
  }
`;
