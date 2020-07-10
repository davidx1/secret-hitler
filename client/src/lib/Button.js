import styled from "styled-components";

export const Button = styled.button`
  min-width: 180px;
  height: 40px;
  cursor: pointer;
  width: fit-content;
  margin: 4px auto;
  color: ${({ theme }) => theme.neutral};
  background-color: ${({ theme }) => theme.interactive};
  font-size: 18px;
  border-radius: 5px;
  outline: none;

  @media only screen and (min-width: 768px) {
    min-width: 200px;
    margin: 8px auto;
  }

  @media only screen and (min-width: 992px) {
    min-width: 230px;
    height: 60px;
    font-size: 24px;
  }

  @media only screen and (min-width: 1200px) {
    min-width: 300px;
    font-size: 32px;
  }
`;
