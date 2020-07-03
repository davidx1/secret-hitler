import React from "react"
import styled, { css } from "styled-components"
import { ExitFullscreen, Fullscreen } from "@styled-icons/boxicons-regular"
import useFullscreen from "use-fullscreen"

const buttonStyle = css`
  position: absolute;
  cursor: pointer;
  background-color: #ffffffbb;
  right: 10px;
  top: 10px;
  height: 20px;
  width: 20px;
  z-index: 100;
  &:hover {
    background-color: #ffffff;
  }
  @media only screen and (min-width: 768px) {
    right: 15px;
    top: 15px;
    height: 25px;
    width: 25px;
  }
  @media only screen and (min-width: 992px) {
    height: 30px;
    width: 30px;
  }
  @media only screen and (min-width: 1200px) {
    right: 20px;
    top: 20px;
  }
  @media only screen and (min-width: 1450px) {
    height: 40px;
    width: 40px;
  }
`

const Expand = styled(Fullscreen)`
  ${buttonStyle}
`

const Collapse = styled(ExitFullscreen)`
  ${buttonStyle}
`

export const FullScreenButton = () => {
  const [isFullscreen, toggleFullscreen] = useFullscreen()
  return isFullscreen ? (
    <Collapse onClick={() => toggleFullscreen()} />
  ) : (
    <Expand onClick={() => toggleFullscreen()} />
  )
}
