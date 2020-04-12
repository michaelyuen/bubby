import styled from "styled-components";

const ChatContainer = styled.div`
  .ChatContainer {
    &__message-container {
      background: lavender;
      border: 1px solid black;
      height: 500px;
      margin-bottom: 25px;
      padding: 50px;
    }

    &__input-container {
      display: flex;

      > :first-child {
        flex-grow: 1;
      }

      > :last-child {
        margin-left: 15px;
      }
    }
  }
`;
ChatContainer.displayName = "ChatContainer";
export default ChatContainer;
