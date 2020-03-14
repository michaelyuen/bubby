import React, { useState, ReactNode } from "react";
import { gql } from "apollo-boost";
import { useLazyQuery } from "@apollo/react-hooks";
import Input from "components/Input";
import Form from "components/Form";
import Button from "components/Button";
import { LayoutSmall } from "components/Layout";

interface FormStateMap {
  [index: string]: ReactNode;
}

const SEND_PASSWORD_RESET_EMAIL = gql`
  query sendPasswordResetEmail($email: String!) {
    sendPasswordResetEmail(email: $email)
  }
`;

export default function SignUp() {
  const [email, setEmail] = useState({});
  const [
    sendPasswordResetEmail,
    { called, data, error, loading }
  ] = useLazyQuery(SEND_PASSWORD_RESET_EMAIL);
  const formStateMap: FormStateMap = {
    defaultState: (
      <Form
        onSubmit={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          sendPasswordResetEmail({ variables: { email } });
        }}
      >
        <h1>🏕</h1>
        <Input
          name="Email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required
          type="email"
        />
        <Button type="submit">Submit</Button>
      </Form>
    ),
    loading: "Loading...",
    error: "Something went wrong. Please try again.",
    success: (
      <>
        <h1 style={{ textAlign: "center" }}>
          <span role="img" aria-label="UFO emoji">
            🛸
          </span>
        </h1>
        <div>If an account exists, you should receive an email shortly.</div>
      </>
    )
  };
  let state: string = "defaultState";

  if (called) {
    if (loading) {
      state = "loading";
    }

    if (error) {
      state = "error";
    }

    if (data) {
      state = "success";
    }
  }

  return <LayoutSmall>{formStateMap[state]}</LayoutSmall>;
}
