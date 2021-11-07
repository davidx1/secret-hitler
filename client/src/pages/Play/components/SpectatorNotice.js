import React, { useContext, useState } from "react";
import styled, { css } from "styled-components";
import { StateContext } from "../Play";
import { ChevronDown } from "@styled-icons/boxicons-regular/ChevronDown";
import { ChevronUp } from "@styled-icons/boxicons-regular/ChevronUp";

const SpectatorNotice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { spectators, youId } = useContext(StateContext);
  const spectator = spectators.length;
  const isSpectator = spectators.find((s) => s.id === youId);
  const count = spectator === 0 ? "no" : spectator;
  const be = spectator === 1 ? "is" : "are";
  const unit = spectator > 1 ? "spectators" : "spectator";
  const phrase = `${
    isSpectator ? "You are a spectator. " : ""
  }There ${be} currently ${count} ${unit}.`;
  return (
    <Wrapper>
      <p style={{ margin: 0 }}>{phrase}</p>
      {spectators.length > 0 && (
        <>
          {isOpen && (
            <ul>
              {spectators.map((s) => (
                <li>{s.displayName}</li>
              ))}
            </ul>
          )}
          {isOpen ? (
            <StyledChevronUp onClick={() => setIsOpen(false)} />
          ) : (
            <StyledChevronDown onClick={() => setIsOpen(true)} />
          )}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #162447;
  color: #dadada;
  border-radius: 0 0 4px 0;
  padding: 4px 4px 10px;
  font-size: 8px;
  @media only screen and (min-width: 512px) {
    padding: 8px 8px 16px;
    border-radius: 0 0 8px 0;
    font-size: 10px;
  }
  @media only screen and (min-width: 768px) {
    padding: 16px 16px 24px;
    border-radius: 0 0 16px 0;
    font-size: 12px;
  }
  @media only screen and (min-width: 992px) {
    font-size: 14px;
  }
  @media only screen and (min-width: 1200px) {
    font-size: 16px;
  }
  @media only screen and (min-width: 1450px) {
    font-size: 18px;
  }
`;

const chevronStyle = css`
  width: 100%;
  position: absolute;
  bottom: 2px;
  left: 0;
  height: 12px;

  @media only screen and (min-width: 512px) {
    height: 14px;
  }
  @media only screen and (min-width: 768px) {
    height: 16px;
  }
  @media only screen and (min-width: 992px) {
    height: 18px;
  }
  @media only screen and (min-width: 1200px) {
    height: 20px;
  }
  @media only screen and (min-width: 1450px) {
    height: 24px;
  }
`;

const StyledChevronDown = styled(ChevronDown)`
  cursor: pointer;
  ${chevronStyle}
`;

const StyledChevronUp = styled(ChevronUp)`
  cursor: pointer;
  ${chevronStyle}
`;

export { SpectatorNotice };
