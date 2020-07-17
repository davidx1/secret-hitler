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

const StatusWindow = styled.div`
  height: min-content;
  width: 100%;
  border-bottom: 1px solid white;
  padding: 10px;
  text-align: center;
`;

const ChatWindow = styled.div`
  height: 80%;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: auto;
  padding: 5px;
  > * {
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Form = styled.form``;

const Message = styled.p`
  font-size: 14px;
  margin: 0;
  color: ${(props) => (props.isSystem ? "yellow" : "#f4f4f4")};
  background-color: transparent;
  @media only screen and (min-width: 992px) {
    font-size: 18px;
  }
`;

const ChatInput = styled.input`
  font-size: 14px;
  width: 100%;
  @media only screen and (min-width: 992px) {
    font-size: 18px;
  }
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
      <StatusBar />
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

function StatusBar() {
  const { state, presidentIndex, chancellorIndex, players } = useContext(
    StateContext
  );
  const president = players[presidentIndex];
  const chancellor = players[chancellorIndex];

  function getSystemMessage() {
    switch (state) {
      case "waiting":
        return "Waiting for players";
      case "chancellorSelection":
        return `${president.displayName} (President) to select new Chancellor`;
      case "election":
        const activePlayerCount = players.filter((p) => p.isActive).length;
        const votes = players.filter(
          (p) => p.isActive && typeof p.vote === "boolean"
        ).length;
        return `${votes}/${activePlayerCount} votes casted`;
      case "revealVote":
        return `All votes in: Ja: ${
          players.filter((p) => p.vote === true).length
        } --- Nein: ${players.filter((p) => p.vote === false).length}`;
      case "enactRandomPolicy":
        return `Enacting top policy from the policy deck`;
      case "filterCards":
        return `${president.displayName} (President) to discard one policy card`;
      case "enactPolicy":
        return `${chancellor.displayName} (Chancellor) to enact one policy card`;
      case "viewThreeCards":
        return `${president.displayName} (President) to view next three policy cards`;
      case "investigatePlayer":
        return `${president.displayName} (President) to investigate a player's true identity`;
      case "killPlayer":
        return `${president.displayName} (President) to kill a player`;
      case "presidentSelection":
        return `${president.displayName} (President) to select next President`;
      case "liberalWin":
      case "fascistWin":
      default:
        return "";
    }
  }

  return (
    <StatusWindow>
      <Message isSystem>{getSystemMessage()}</Message>
    </StatusWindow>
  );
}
