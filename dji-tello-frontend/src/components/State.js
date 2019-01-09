import React, { Component, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
// import logo from './logo.svg';
// import './DroneState.css';
import socket from '../socket';

class DroneState extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    socket.on('connect', () => {
      socket.emit('command', 'command')
      socket.emit('command', 'battery?')

    })
    socket.on('droneState', state => {
      console.log(state);
    })
    socket.on('status', status => {
      console.log(status)
    })
  }

  render() {

    // socket.on('connect', () => {
    //   console.log('connecteed');
    //   socket.on('status', status => {
    //     console.log(status)
    //   })
    // })
    return (
      <div>{'state'}</div>
    );
  }
}

export default DroneState;
