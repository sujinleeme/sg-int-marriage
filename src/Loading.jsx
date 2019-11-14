import React, { useEffect, useReducer } from "react"

import { CoupleRingImg } from "./Svg"
import styled from "styled-components"

const Container = styled.div`
  margin: 20px;
  width: 100px;
  height: 100px;
  animation: spin 4s infinite linear;
  margin: 0 auto;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
      
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
const Loading = () => {
  return (
    <Container>
      <CoupleRingImg />
    </Container>
  )
}

export default Loading
