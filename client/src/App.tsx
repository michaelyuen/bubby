import { gql } from "apollo-boost";
import React from "react";
import { ThemeProvider } from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Toast from "react-toast-component";

import { theme, GlobalStyle } from "./style/theme";
import Login from "./containers/Login";
import Home from "./containers/Home";
import SignUp from "./containers/SignUp";
import ResetPassword from "./containers/ResetPassword";

const GET_NOTIFICATIONS = gql`
  {
    data
  }
`;

const App: React.FC = () => {
  const { data } = useQuery(GET_NOTIFICATIONS);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Toast {...data} />
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/dashboard" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/forgot-password" component={ResetPassword} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
