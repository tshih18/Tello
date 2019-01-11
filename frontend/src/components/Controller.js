import React, { Component } from 'react';
import Gamepad from 'react-gamepad';

class Controller extends Component {
  render() {
    return (
      <Gamepad
        onConnect={(gamepadIndex) => {console.log(gamepadIndex)}}
        onDisconnect={(gamepadIndex) => {}}

        onButtonDown={(buttonName) => {}}
        onButtonUp={(buttonName) => {}}
        onButtonChange={(buttonName, pressed) => {}}
        onAxisChange={(axisName, value, previousValue) => {}}

        onA={() => {}}
        onB={() => {}}
        onX={() => {}}
        onY={() => {}}

        onStart={() => {}}
        onBack={() => {}}

        onLT={() => {}}
        onRT={() => {}}

        onLB={() => {}}
        onRB={() => {}}

        onLS={() => {}}
        onRS={() => {}}

        onUp={() => {}}
        onDown={() => {}}
        onLeft={() => {}}
        onRight={() => {}}
      />
    )
  }
}

export default Controller;
