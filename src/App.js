import React from "react";
import styled from "styled-components";

import Draggable from "./Components/Draggable"

function App() {
  return (
    <Container>
      <Draggable>
      <Rect />
      </Draggable>
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: green;
`;

const Rect = styled.div`
  width: 200px;
  height: 200px;
  background: red;
`;
