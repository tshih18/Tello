import React, { Component } from 'react';
import DroneState from './components/DroneState';
import DroneDash from './components/DroneDash';
import ControllerContainer from './container/ControllerContainer';
import VideoStream from './components/VideoStream';
import Sketch from './components/Sketch';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: white;
    /* font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; */
    font-family: 'Operator Mono', monospace;
    font-weight: 900;
    font-size: 1rem;
    background:#193549;
    color: white;
  }
  * {
    font-family: 'Operator Mono', monospace;
    box-sizing: border-box;
  }
  h2 {
    text-align: center;
    font-style: italic;
  }
`;

const PageStyles = styled.div`
  max-width: 700px;
  margin: 50px auto;
`;

class App extends Component {
  render() {
    return (
      // <Controller />
      <PageStyles>
        <GlobalStyle />
        <VideoStream />
        {/* <DroneState /> */}
        <DroneDash />
        <Sketch />
        <ControllerContainer />
      </PageStyles>

      //<State />

    );
  }
}

export default App;
