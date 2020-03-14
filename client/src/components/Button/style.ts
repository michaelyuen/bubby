import styled from "styled-components";
import {
  spacingBorder,
  colorSecondary,
  spacingBorderRadius,
  spacingDefault,
  colorButtonText
} from "style/themeFunctions";

export const ButtonContainer = styled.button`
  border: ${spacingBorder} solid ${colorSecondary};
  border-radius: ${spacingBorderRadius};
  padding: ${spacingDefault};
  background: ${colorSecondary};
  color: ${colorButtonText};

  &:hover {
    cursor: pointer;
  }
`;
