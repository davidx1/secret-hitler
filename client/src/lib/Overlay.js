import styled from "styled-components";
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
