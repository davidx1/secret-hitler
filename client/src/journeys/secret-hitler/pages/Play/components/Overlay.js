import styled from "styled-components";
export const Overlay = styled.div`
  position: absolute;
  height: 100vh;
  background-color: #00000090;
  width: 100vw;
  bottom: 0;
  left: 0;
  right: 0;
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
