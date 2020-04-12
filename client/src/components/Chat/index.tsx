import React, { useState } from "react";
import gql from "graphql-tag";
import { useSubscription } from "@apollo/react-hooks";
import Input from "components/Input";
import Button from "components/Button";
import { LayoutLarge } from "components/Layout";
import Message from "components/Message";
import ChatContainer from "./style";

const MESSAGES_SUBSCRIPTION = gql`
  subscription onMessageAdded {
    messageAdded {
      author
      message
    }
  }
`;

const Chat: React.FC = () => {
  const [value, setValue] = useState("");
  const { data, error } = useSubscription(MESSAGES_SUBSCRIPTION);

  if (error) {
    return <>"you broke it you buy it!"</>;
  }

  const onChange = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>): void => setValue(value);

  const onKeyPress = ({ key }: React.KeyboardEvent<HTMLInputElement>): void => {
    if (key === "Enter" && value) {
      console.log(value);
    }
  };

  const onMessageSend = (): void => {
    if (value) {
      console.log(value);
    }
  };

  const renderMessages = () => {
    console.log(data);

    return <Message author="sue" message="hello world" />;
  };

  return (
    <LayoutLarge>
      <ChatContainer className="ChatContainer">
        <h1>Messages:</h1>
        <article className="ChatContainer__message-container">
          {renderMessages()}
        </article>
        <div className="ChatContainer__input-container">
          <Input
            onChange={onChange}
            onKeyPress={onKeyPress}
            placeholder="enter your message..."
            value={value}
          />
          <Button onClick={onMessageSend}>Send Message</Button>
        </div>
      </ChatContainer>
    </LayoutLarge>
  );
};
export default Chat;
