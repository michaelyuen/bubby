import styled from "styled-components";
import {
  spacingDefault,
  gridFullPageFormWidth,
  themeSpacingLarge,
  gridMaxWidth
} from "style/themeFunctions";

export const LayoutSmall = styled.div`
  width: ${gridFullPageFormWidth};
  margin: ${themeSpacingLarge} auto ${spacingDefault};
  max-width: 365px;
`;

export const LayoutLarge = styled.div`
  @media (min-width: 1600px) {
    width: ${gridMaxWidth};
    padding: ${spacingDefault};
    margin: 0 auto;
  }
`;
