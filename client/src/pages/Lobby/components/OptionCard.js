import styled from "styled-components";

export const OptionCard = styled.button`
  width: 300px;
  height: 100px;
  cursor: pointer;
  background-color: #fbb969;
  border: 6px solid #4f0d00;
  border-radius: 20px;
  font-size: 24px;

  @media only screen and (min-width: 512px) {
    width: 280px;
    height: 120px;
    font-size: 32px;
    border-radius: 24px;
  }

  @media only screen and (min-width: 768px) {
    font-size: 32px;
    border-radius: 24px;
    border: 8px solid #4f0d00;
  }
  @media only screen and (min-width: 992px) {
    width: 400px;
    height: 150px;
    font-size: 32px;
    border-radius: 28px;
  }
  @media only screen and (min-width: 1200px) {
    width: 380px;
    height: 180px;
    font-size: 48px;
    border-radius: 32px;
  }
  @media only screen and (min-width: 1450px) {
    width: 500px;
    height: 230px;
    font-size: 52px;
    border-radius: 48px;
    border: 14px solid #4f0d00;
  }
`;

export const OptionWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  > * {
    margin-right: 8px;
  }

  flex-direction: column;

  > * {
    margin-bottom: 16px;
  }

  @media only screen and (min-width: 768px) {
    flex-direction: row;

    > * {
      margin-bottom: 0;
      margin-right: 16px;
    }
  }

  @media only screen and (min-width: 992px) {
    > * {
      margin-right: 24px;
    }
  }

  @media only screen and (min-width: 1200px) {
    > * {
      margin-right: 32px;
    }
  }

  @media only screen and (min-width: 1450px) {
    > * {
      margin-right: 48px;
    }
  }
  & :last-child {
    margin: 0;
  }
`;
