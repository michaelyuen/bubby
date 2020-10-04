import { createGlobalStyle } from "styled-components";
import { colorText, colorBackground, colorLink } from "./themeFunctions";

const darkMode = false;
// window.matchMedia &&
// window.matchMedia("(prefers-color-scheme: dark)").matches;

export const theme = {
  color: {
    background: darkMode ? "#282c34" : "#FFFFFF",
    link: "#000",
    buttonText: "#fffffe",
    text: darkMode ? "#FFFFFF" : "#000",
    secondary: "#000",
  },
  grid: {
    maxWidth: "1600px",
    width: "800px",
    fullPageFormWidth: "90%",
  },
  spacing: {
    default: "10px",
    borderRadius: "4px",
    border: "1px",
    large: "50px",
  },
  font: {
    small: "12px",
    medium: "14px",
  },
};

export const GlobalStyle = createGlobalStyle`
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${colorText};
    background: ${colorBackground};
  }
  a {
    text-decoration: none;
    color: ${colorLink};
  }
`;
