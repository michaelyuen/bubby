import React from "react";
import { useHistory } from "react-router-dom";
import Chat from "components/Chat";
import Copyright from "components/Copyright";
import { LayoutLarge } from "components/Layout";
import Button from "components/Button";

export default function NavTabs() {
  const history = useHistory();

  return (
    <LayoutLarge>
      <Chat />
      <Button
        onClick={() => {
          history.push("/login");
        }}
      >
        Logout
      </Button>
      <Copyright />
    </LayoutLarge>
  );
}
