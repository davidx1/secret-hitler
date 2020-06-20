import React, { useState, useContext } from "react";
import styled from "styled-components";

import { StateContext, ActionContext } from "../Play";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #162447;
  color: #f4f4f4;
`;

const ChatWindow = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Form = styled.form`
  height: 20px;
`;

const Message = styled.p`
  margin: 0 4px 8px;
`;

const ChatInput = styled.input`
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
          <Message>{c}</Message>
        ))}
      </ChatWindow>
      <Form onSubmit={handleSubmit}>
        <ChatInput
          onChange={(e) => setChat(e.target.value)}
          value={chat}
        ></ChatInput>
      </Form>
    </Wrapper>
  );
};
