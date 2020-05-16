import React from "react";

type Props = {
  author: string;
  message: string;
};

const Message: React.FC<Props> = ({ author, message }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <strong>{author}:</strong>&nbsp;<span>{message}</span>
    </div>
  );
};
export default Message;
