import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import State from './components/State';
import DroneState from './components/DroneState';
import Commands from './components/Commands';
import Controller from './components/Controller';
import LeftJoyStick from './components/LeftJoystick';
import RightJoyStick from './components/RightJoystick';
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
  max-width: 500px;
  margin: 0 auto;
`;

class App extends Component {
  render() {
    return (
      // <Controller />
      <PageStyles>
        <h2>JavaScript Drone</h2>
        <GlobalStyle />
        <Commands />
        <DroneState />
        <LeftJoyStick />
        <RightJoyStick />
      </PageStyles>

      //<State />

    );
  }
}

export default App;
