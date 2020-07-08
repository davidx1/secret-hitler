import React, { useState, useContext } from "react";
import styled from "styled-components";

import { StateContext, ActionContext } from "../Play";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #162447;
`;

const ChatWindow = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: scroll;
`;

const Form = styled.form``;

const Message = styled.p`
  font-size: 18px;
  margin: 0 4px 8px;
  color: ${(props) => (props.isSystem ? "red" : "#f4f4f4")};
  background-color: ${(props) => (props.isSystem ? "yellow" : "transparent")};
`;

const ChatInput = styled.input`
  font-size: 18px;
  width: 100%;
`;

export const Chat = () => {
  const [chat, setChat] = useState("");
  const { chatState } = useContext(StateContext);
  const { sendChat } = useContext(ActionContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    sendChat(chat);
    setChat("");
  };
  return (
    <Wrapper>
      <ChatWindow>
        {chatState.map((c) => (
          <Message isSystem={c.isSystem}>{c.message}</Message>
        ))}
      </ChatWindow>
      <Form onSubmit={handleSubmit}>
        <ChatInput
          placeholder="Enter a message..."
          onChange={(e) => setChat(e.target.value)}
          value={chat}
        ></ChatInput>
      </Form>
    </Wrapper>
  );
};
