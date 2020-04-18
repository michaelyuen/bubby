import styled from "styled-components";

const ChatContainer = styled.div`
  background: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  height: 100vh;
  margin-top: -50px;
  margin-bottom: -10px;
  padding: 25px;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  display: flex;

  @media (min-width: 768px) {
    height: 500px;
    margin-bottom: 25px;
    padding: 50px;
  }

  .ChatContainer {
    &__input-container {
      display: flex;

      > :first-child {
        flex-grow: 1;
      }

      > :last-child {
        display: none;

        @media (min-width: 768px) {
          display: block;
          margin-left: 15px;
        }
      }
    }
  }
`;
ChatContainer.displayName = "ChatContainer";
export default ChatContainer;
