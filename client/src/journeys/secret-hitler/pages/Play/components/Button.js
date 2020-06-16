import styled from "styled-components";

const Button = styled.button`
  min-width: 217px;
  height: 25px;
  cursor: pointer;
  width: fit-content;
  margin: 8px auto;
  color: ${({ theme }) => theme.neutral};
  background-color: ${({ theme }) => theme.interactive};
  font-size: 14px;
  border-radius: 20px;
  outline: none;

  @media only screen and (min-width: 512px) {
    width: 400px;
  }

  @media only screen and (min-width: 992px) {
    min-width: 217px;
    height: 60px;
    font-size: 24px;
  }
`;

export default Button;
