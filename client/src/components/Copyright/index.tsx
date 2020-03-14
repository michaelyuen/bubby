import React from "react";
import { Link } from "react-router-dom";
import { CopyrightContainer } from "./style";

export default function Copyright() {
  return (
    <CopyrightContainer>
      {"Copyright © "}
      <Link to="/">bubby</Link> {new Date().getFullYear()}
      {"."}
    </CopyrightContainer>
  );
}
