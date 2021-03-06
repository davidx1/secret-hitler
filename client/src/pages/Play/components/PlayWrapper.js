import styled from "styled-components";
export const PlayWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-top: 1px solid ${(props) => props.theme.black};
  border-bottom: 1px solid ${(props) => props.theme.black};
  margin: 0 auto 20px auto;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  min-width: 300px;
  max-height: 280px;
  padding: 10px 0;
  @media only screen and (min-width: 512px) {
    max-height: 350px;
  }
  @media only screen and (min-width: 768px) {
    max-height: 500px;
  }
  @media only screen and (min-width: 992px) {
    max-height: 700px;
  }
  @media only screen and (min-width: 1200px) {
    max-height: 950px;
  }
  @media only screen and (min-width: 1450px) {
    max-width: 1920px;
  }
`;
