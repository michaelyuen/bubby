import styled from "styled-components";
import {
  spacingDefault,
  gridFullPageFormWidth,
  themeSpacingLarge,
  gridWidth,
  gridMaxWidth,
} from "../../style/themeFunctions";

export const LayoutSmall = styled.div`
  margin: ${themeSpacingLarge} auto ${spacingDefault};
  max-width: 365px;
`;

export const LayoutMedium = styled.div`
  max-width: ${gridWidth};
  margin: ${themeSpacingLarge} auto ${spacingDefault};
`;

export const LayoutLarge = styled.div`
  @media (min-width: ${gridFullPageFormWidth}) {
    max-width: ${gridMaxWidth};
    padding: ${spacingDefault};
    margin: 0 auto;
  }
`;
