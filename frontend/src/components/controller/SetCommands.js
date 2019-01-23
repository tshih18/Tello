import React, { Component } from 'react';
import { Header, Grid, Input, Button, Label, Message } from 'semantic-ui-react'
import { sendCommands } from '../../helpers/command';
import socket from '../../socket';

class SetCommands extends Component {
  constructor(props) {
    super(props);
    this.changeHandeler = this.changeHandeler.bind(this);
    this.setDistance = this.setDistance.bind(this);
    this.setSpeed = this.setSpeed.bind(this);
    this.setRotation = this.setRotation.bind(this);
    this.state = {
      dist: '',
      speed: '',
      degree: '',
      distError: false,
      speedError: false,
      degreeError: false,
      errorMessage: '',
    }
  }

  changeHandeler(val, type) {
    if (type === 'dist') {
      this.setState({ dist: val })
    } else if (type === 'speed') {
      this.setState({ speed: val });
    } else if (type === 'degree') {
      this.setState({ degree: val });
    }
  }

  setDistance() {
    if (this.state.dist >= 20 && this.state.dist <= 500) {
      this.props.setDistanceAction(this.state.dist);
      this.setState({ distError: false, errorMessage: '' });
    } else {
      this.setState({ distError: true, errorMessage: 'Distance values must be between 20-500' });
    }
  }


  setSpeed() {
    if (this.state.speed >= 10 && this.state.speed <= 100) {
      socket.emit('command', `speed ${this.state.speed}`)
      this.setState({ speedError: false, errorMessage: '' });
    } else {
      this.setState({ speedError: true, errorMessage: 'Speed values must be between 10-100' });
    }
  }

  setRotation() {
    if (this.state.degree >= 1 && this.state.degree <= 360) {
      this.props.setDegreeAction(this.state.degree);
      this.setState({ degreeError: false, errorMessage: '' });
    } else {
      this.setState({ degreeError: true, errorMessage: 'Degree values must be between 1-360'});
    }
  }

  render() {
    const { dist, speed, degree, distError, speedError, degreeError, errorMessage } = this.state;
    return (
      <div>
        {
          (distError || speedError || degreeError) &&
          <Message negative>
            <Message.Header>{errorMessage}</Message.Header>
            {/* <p>That offer has expired</p> */}
          </Message>
        }
        <Button
          color='blue'
          content="Detect Mission Pad"
          onClick={() => sendCommands(['command', 'mon', 'mdirection 2', 'takeoff'])}
        />
        <div>
          <Input
            error={distError}
            value={dist}
            label={'cm'}
            labelPosition='right'
            type='number'
            size='tiny'
            placeholder='Set Distance'
            onChange={(e) => this.changeHandeler(e.target.value, 'dist')}
          />
          <Button content="Set" color='blue' onClick={this.setDistance}/>
        </div>
        <div>
          <Input
            error={speedError}
            value={speed}
            label={'cm/s'}
            labelPosition='right'
            type='number'
            size='tiny'
            placeholder='Set Speed'
            onChange={(e) => this.changeHandeler(e.target.value, 'speed')}
          />
          <Button content="Set" color='blue' onClick={this.setSpeed} />
        </div>
        <div>
          <Input
            error={degreeError}
            value={degree}
            label={'degrees'}
            labelPosition='right'
            type='number'
            size='tiny'
            placeholder='Set Rotation'
            onChange={(e) => this.changeHandeler(e.target.value, 'degree')}
          />
          <Button content="Set" color='blue' onClick={this.setRotation} />
        </div>


      </div>



    )
  }
}

export default SetCommands;
