import React from "react";
import Chat from "components/Chat";
import Copyright from "components/Copyright";
import { LayoutMedium } from "components/Layout";

export default function NavTabs() {
  return (
    <LayoutMedium>
      <Chat />
      <Copyright />
    </LayoutMedium>
  );
}
