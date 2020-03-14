import React from "react";
import styled from "styled-components";
import Input from "components/Input";
import Button from "components/Button";
import { LayoutSmall } from "components/Layout";

const ChatContainer = styled.div``;

export default function Chat() {
  return (
    <LayoutSmall>
      <ChatContainer>
        <h1>Messages:</h1>
        <div>sue: hello</div>
        {/* Get Messages */}
        <Input />
        <br />
        <Button>Send Message</Button>
      </ChatContainer>
    </LayoutSmall>
  );
}
