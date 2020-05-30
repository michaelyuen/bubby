import React from "react";
import { ThemeProvider } from "styled-components";
import { addDecorator } from "@storybook/react";
import { theme, GlobalStyle } from "../style/theme";

import "modern-normalize/modern-normalize.css";

addDecorator((story) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {story()}
  </ThemeProvider>
));
