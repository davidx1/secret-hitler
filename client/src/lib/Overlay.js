import React from "react";
import styled from "styled-components";
import { Close } from "@styled-icons/evil/Close";
import { motion } from "framer-motion";
import FocusLock from "react-focus-lock";

export const OverlayBase = styled(motion.div)`
  position: absolute;
  height: 100%;
  width: 100%;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #00000099;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  z-index: 1;
`;

export const Overlay = ({ children, ...props }) => {
  return (
    <OverlayBase
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: 0,
        duration: 0.2
      }}
      {...props}
    >
      <FocusLock persistentFocus={true}>{children}</FocusLock>
    </OverlayBase>
  );
};

export const OverlayTransparent = styled(Overlay)`
  background-color: transparent;
`;

export const InstructionText = styled.h1`
  color: white;
  margin: 0 0 15px 0;
  font-size: 18px;
  text-align: center;

  @media only screen and (min-width: 512px) {
    font-size: 24px;
  }
  @media only screen and (min-width: 768px) {
    margin: 0 0 30px 0;
    font-size: 32px;
  }
  @media only screen and (min-width: 992px) {
    font-size: 40px;
  }
  @media only screen and (min-width: 1200px) {
    font-size: 48px;
  }
`;

export const RuleText = styled.p`
  color: #ffffffbb;
  margin: auto;
  margin-bottom: 15px;
  text-align: center;
  font-size: 12px;
  width: 80%;
  text-align: center;

  @media only screen and (min-width: 512px) {
    font-size: 14px;
  }
  @media only screen and (min-width: 768px) {
    margin-bottom: 30px;
    font-size: 14px;
  }
  @media only screen and (min-width: 992px) {
    font-size: 14px;
  }
  @media only screen and (min-width: 1200px) {
    font-size: 16px;
  }
`;

export const OverlayCrossButton = styled.button`
  height: 60px;
  width: 60px;
  margin: 10px;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  color: white;
  background-color: transparent;
  border: none;

  @media only screen and (min-width: 768px) {
    margin: 8px auto;
    height: 80px;
    width: 80px;
    margin: 20px;
  }
`;

export const OverlayCross = (props) => (
  <OverlayCrossButton {...props} type="button">
    <Close />
  </OverlayCrossButton>
);
