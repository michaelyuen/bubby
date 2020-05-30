import styled from "styled-components";
import { spacingDefault, fontSmall } from "../../style/themeFunctions";

export const FormContainer = styled.form`
  a {
    font-size: ${fontSmall};
  }

  > * {
    width: 100%;
    display: block;
    margin-bottom: ${spacingDefault};
  }

  img {
    width: auto;
    margin: 20px auto;
    height: 40px;
    display: block;
  }

  h1,
  a,
  div {
    text-align: center;
  }
`;
