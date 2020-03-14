import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { gql } from "apollo-boost";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import Button from "components/Button";
import Input from "components/Input";
import Form from "components/Form";
import { LayoutSmall } from "components/Layout";

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export default function Login(props: any) {
  const [credentials, setCredentials] = useState({});
  const [login, { data }] = useMutation(LOGIN);
  const client = useApolloClient();

  if (
    data &&
    data.login !==
      "The password is invalid or the user does not have a password." &&
    data.login !==
      "Too many unsuccessful login attempts. Please try again later."
  ) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <LayoutSmall>
      <Form
        onSubmit={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          if (credentials) {
            login({ variables: credentials }).catch(err => {
              client.writeData({ data: { errors: err } });
            });
          }
        }}
      >
        <img alt="logo" src="/logo192.png" />
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCredentials({
              ...credentials,
              email: e.target.value
            })
          }
          name="Email"
          type="email"
          required
        />
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCredentials({
              ...credentials,
              password: e.target.value
            })
          }
          name="Password"
          type="password"
          required
        />
        <Button>Sign In</Button>
        <Link to="/forgot-password">Forgot password?</Link>
        <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
      </Form>
    </LayoutSmall>
  );
}
