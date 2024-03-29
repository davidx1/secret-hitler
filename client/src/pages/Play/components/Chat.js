import React, { useState, useContext } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { isMobile } from "react-device-detect";

import { StateContext, ActionContext } from "../Play";
import { ColorSpan } from "./ColorSpan";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #162447;
  border-radius: 8px;
`;

const StatusWindow = styled.div`
  position: relative;
  height: 56px;
  width: 100%;
  border-bottom: 1px solid white;
  text-align: center;
  overflow: hidden;
  border-radius-top: 8px;
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
  border-radius: 8px;
  > * {
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Form = styled.form``;

const Message = styled(motion.p)`
  font-size: 14px;
  margin: 0;
  color: #f4f4f4;
  @media only screen and (min-width: 992px) {
    font-size: 18px;
  }
`;

const Tip = styled(motion.p)`
  font-size: 14px;
  margin: 0;
  color: black;
  background-color: yellow;
  margin-bottom: 8px;
  @media only screen and (min-width: 992px) {
    font-size: 18px;
  }
`;

const StatusWrapper = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  padding: 10px;
  width: 100%;
`;

const Status = styled.p`
  font-size: 14px;
  margin: 0;
  color: #f4f4f4;
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

export const Chat = ({ onMobileInputFocus }) => {
  const [chat, setChat] = useState("");
  const { chatState } = useContext(StateContext);
  const { sendChat } = useContext(ActionContext);

  const handleInputFocus = () => {
    if (isMobile) {
      onMobileInputFocus(true);
    }
  };

  const handleInputBlur = () => {
    if (isMobile) {
      onMobileInputFocus(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendChat(chat);
    setChat("");
  };
  return (
    <Wrapper>
      <StatusBar />
      <ChatWindow>
        <Tip>*DO NOT CLOSE THIS WINDOW* You will disconnect and be unable to rejoin</Tip>
        <Tip>
          All Fascists who are NOT Hitler will see everyone's identities. Hitler and Liberals can
          only see their own identity.
        </Tip>
        {chatState.map((c) => (
          <Message>
            <ColorSpan color={c.color}>{c.name}</ColorSpan>:{" "}
            {c.targetName ? <ColorSpan color={c.targetColor}>{c.targetName}</ColorSpan> : null}
            {c.content}
          </Message>
        ))}
      </ChatWindow>
      <Form onSubmit={handleSubmit}>
        <ChatInput
          placeholder="Enter a message..."
          onChange={(e) => setChat(e.target.value)}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          value={chat}
        ></ChatInput>
      </Form>
    </Wrapper>
  );
};

function StatusBar() {
  const { state, presidentIndex, chancellorIndex, players } = useContext(StateContext);
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
        const votes = players.filter((p) => p.isActive && typeof p.vote === "boolean").length;
        return `${votes}/${activePlayerCount} votes casted`;
      case "revealVote":
        return `All votes in: Ja: ${players.filter((p) => p.vote === true).length} --- Nein: ${
          players.filter((p) => p.vote === false).length
        }`;
      case "enactRandomPolicy":
        return `Enacting top policy from the policy deck`;
      case "filterCards":
        return `${president.displayName} (President) to filter policy`;
      case "enactPolicy":
        return `${chancellor.displayName} (Chancellor) to enact policy`;
      case "viewThreeCards":
        return `${president.displayName} (President) to view next three policies`;
      case "investigatePlayer":
        return `${president.displayName} (President) to investigate a player`;
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
      <AnimatePresence initial={false}>
        <StatusWrapper
          key={getSystemMessage()}
          initial={{
            x: 200,
            backgroundColor: "hsl(0, 0%, 100%)"
          }}
          animate={{
            zIndex: 1,
            x: 0,
            backgroundColor: "hsl(0, 0, 0)"
          }}
          exit={{
            zIndex: 0,
            x: -200
          }}
          transition={{
            duration: 0.5
          }}
        >
          <Status>{getSystemMessage()}</Status>
        </StatusWrapper>
      </AnimatePresence>
    </StatusWindow>
  );
}
