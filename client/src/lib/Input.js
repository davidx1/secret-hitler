import styled from "styled-components";

export const Input = styled.input`
  width: 300px;
  font-size: 32px;
  padding: 15px;
  border-radius: 10px;
  background-color: white;
  border: none;
  margin-bottom: 20px;
  font-size: 18px;

  @media only screen and (min-width: 512px) {
    width: 350px;
  }
  @media only screen and (min-width: 768px) {
    font-size: 24px;

    width: 400px;
  }
  @media only screen and (min-width: 992px) {
    width: 400px;
    margin-bottom: 40px;
  }
  @media only screen and (min-width: 1200px) {
    font-size: 32px;

    width: 500px;
  }
  @media only screen and (min-width: 1450px) {
    width: 550px;
  }
`;
