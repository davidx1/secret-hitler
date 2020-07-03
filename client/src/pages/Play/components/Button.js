import styled from "styled-components";

const Button = styled.button`
  min-width: 100px;
  height: 25px;
  cursor: pointer;
  width: fit-content;
  margin: 4px auto;
  color: ${({ theme }) => theme.neutral};
  background-color: ${({ theme }) => theme.interactive};
  font-size: 12px;
  border-radius: 20px;
  outline: none;

  @media only screen and (min-width: 512px) {
    min-width: 150px;
    font-size: 14px;
  }

  @media only screen and (min-width: 768px) {
    min-width: 180px;
    margin: 8px auto;
  }

  @media only screen and (min-width: 992px) {
    min-width: 230px;
    height: 60px;
    font-size: 24px;
  }
`;

export default Button;
