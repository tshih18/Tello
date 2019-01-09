import React, { Component } from 'react';
import {Joystick} from 'react-joystick-component';
import socket from '../socket';

class LeftJoyStick extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dist: 100
    };
    this.handleMove = this.handleMove.bind(this);
  }


  handleMove(e) {
    console.log(e.type, e.x, e.y, e.direction)
    if (e.direction === "FORWARD") {
      socket.emit('command', `forward ${this.state.dist}`)
    } else if (e.direction === 'BACKWARD') {
      socket.emit('command', `back ${this.state.dist}`)
    } else if (e.direction === 'LEFT') {
      socket.emit('command', `left ${this.state.dist}`)
    } else if (e.direction === 'RIGHT') {
      socket.emit('command', `right ${this.state.dist}`)
    }
  }

  handleStop(e) {
    console.log(e.type, e.x, e.y, e.direction)
  }
  handleStart(e) {
    console.log(e.type, e.x, e.y, e.direction)
  }

  render() {
    return (
      <Joystick
        size={100}
        baseColor="gray"
        stickColor="blue"
        throttle={10}
        move={this.handleMove}
        stop={this.handleStop}
        start={this.handleStart}

      />
    )
  }
}

export default LeftJoyStick;
