import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`
const Button = styled.button`
  background-color: white;
  line-height: 3;
  width: 200px;
`

export const StartButton = ({ playerCount, onClick }) => {
  return (
    <Wrapper>
      <Button onClick={onClick} disabled={playerCount < 5}>
        Start!
      </Button>
      {playerCount < 5 && <h3>Waiting for at least 5 players</h3>}
    </Wrapper>
  )
}
