import styled from "styled-components";
import { Close } from "@styled-icons/evil/Close";

export const Overlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;

  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #000000dd;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
`;

export const InstructionText = styled.h1`
  color: white;
  margin: 0 0 15px 0;
  font-size: 25px;
  @media only screen and (min-width: 768px) {
    margin: 0 0 30px 0;
    font-size: 40px;
  }
`;

export const OverlayCross = styled(Close)`
  height: 60px;
  width: 60px;
  margin: 10px;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  color: white;

  @media only screen and (min-width: 768px) {
    min-width: 200px;
    margin: 8px auto;
    height: 80px;
    width: 80px;
    margin: 20px;
  }
`;