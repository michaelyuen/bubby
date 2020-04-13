import React from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { theme, GlobalStyle } from "./style/theme";
import Login from "./containers/Login";
import Home from "./containers/Home";
import SignUp from "./containers/SignUp";
import ResetPassword from "./containers/ResetPassword";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
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
