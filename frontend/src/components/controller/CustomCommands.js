import React, { Component } from 'react';
import { Header, Form, Input, Button, Label } from 'semantic-ui-react'
import { connect } from 'react-redux';
import socket from '../../socket';
import { sendCommands } from '../../helpers/command';

class CustomCommands extends Component {
  constructor(props) {
    super(props);
    this.changeHandeler = this.changeHandeler.bind(this);
    this.sendCommand = this.sendCommand.bind(this);
    this.flyPolygon = this.flyPolygon.bind(this);
    this.state = {
      sides: {
        n: '',
      },
      go: {
        command: 'go',
        x: '',
        y: '',
        z: '',
        speed: this.props.speed
      },
      curve: {
        command: 'curve',
        x1: '',
        y1: '',
        z1: '',
        x2: '',
        y2: '',
        z2: '',
        speed: this.props.speed
      },
      goMid: {
        command: 'go',
        x: '',
        y: '',
        z: '',
        speed: this.props.speed,
        mid: ''
      },
      curveMid: {
        command: 'curve',
        x1: '',
        y1: '',
        z1: '',
        x2: '',
        y2: '',
        z2: '',
        speed: this.props.speed,
        mid: ''
      },
      jump: {
        command: 'jump',
        x: '',
        y: '',
        z: '',
        speed: this.props.speed,
        yaw: '',
        mid1: '',
        mid2: ''
      }
    };
  }

  changeHandeler(type, key, value) {
    this.setState({ [type]: { ...this.state[type], [key]: value } });
  }

  sendCommand(type) {
    let command = ''
    Object.keys(this.state[type]).map((key) => {
      command += `${this.state[type][key]} `
    })
    command = command.substring(0, command.length-1)
    console.log(command)
    socket.emit('command', `${command}`)
  }

  flyPolygon() {
    let sequence = []
    const rotateAngle = ((this.state.sides.n-2) * 180)/this.state.sides.n
    for (let i = 0; i < this.state.sides.n; i += 1) {
      sequence.push(`forward ${this.props.dist}`)
      sequence.push(`cw ${rotateAngle}`)
    }
    sendCommands(sequence);
  }

  render() {
    return (
      <Form>
        <Input
          style={{ width: '70px' }}
          size='tiny'
          labelPosition='right'
          type='number'
          placeholder='Sides'
          value={this.state.sides.n}
          onChange={(e) => this.changeHandeler('sides', 'n', e.target.value)}
        >
          <Label basic>Trace</Label>
          <input />
          <Label basic>(n) sided regular polygon</Label>
          <Button content='go' onClick={this.flyPolygon}/>
        </Input>
        <Header>Fly to (x,y,z) at 'speed'</Header>
        <Form.Group widths={2}>
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='x'
            value={this.state.go.x}
            onChange={(e) => this.changeHandeler('go', 'x', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='y'
            value={this.state.go.y}
            onChange={(e) => this.changeHandeler('go', 'y', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='z'
            value={this.state.go.z}
            onChange={(e) => this.changeHandeler('go', 'z', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='speed'
            value={this.state.go.speed}
            onChange={(e) => this.changeHandeler('go', 'speed', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Button}
            content='Send'
            onClick={() => this.sendCommand('go')}
          />
        </Form.Group>

        <Header>Fly at a curve according to (x1,y1,z1) and (x2,y2,z2) at 'speed'</Header>
        <Form.Group widths={2}>
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='x1'
            value={this.state.curve.x1}
            onChange={(e) => this.changeHandeler('curve', 'x1', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='y1'
            value={this.state.curve.y1}
            onChange={(e) => this.changeHandeler('curve', 'y1', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='z1'
            value={this.state.curve.z1}
            onChange={(e) => this.changeHandeler('curve', 'z1', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='x2'
            value={this.state.curve.x2}
            onChange={(e) => this.changeHandeler('curve', 'x2', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='y2'
            value={this.state.curve.y2}
            onChange={(e) => this.changeHandeler('curve', 'y2', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='z2'
            value={this.state.curve.z2}
            onChange={(e) => this.changeHandeler('curve', 'z2', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='speed'
            value={this.state.curve.speed}
            onChange={(e) => this.changeHandeler('curve', 'speed', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Button}
            content='Send'
            onClick={() => this.sendCommand('curve')}
          />
        </Form.Group>

        <Header>Fly to (x,y,z) coordinates of the Mission Pad at 'speed'</Header>
        <Form.Group widths={2}>
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='x'
            value={this.state.goMid.x}
            onChange={(e) => this.changeHandeler('goMid', 'x', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='y'
            value={this.state.goMid.y}
            onChange={(e) => this.changeHandeler('goMid', 'y', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='z'
            value={this.state.goMid.z}
            onChange={(e) => this.changeHandeler('goMid', 'z', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='speed'
            value={this.state.goMid.speed}
            onChange={(e) => this.changeHandeler('goMid', 'speed', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Input}
            type='text'
            placeholder='mid'
            value={this.state.goMid.mid}
            onChange={(e) => this.changeHandeler('goMid', 'mid', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Button}
            content='Send'
            onClick={() => this.sendCommand('goMid')}
          />
        </Form.Group>

        <Header>Fly at a curve according to (x1,y1,z1) and (x2,y2,z2) of the Mission Pad ID at 'speed'. If the arc radius is not within a range of 0.5-10 meters, it will respond with an error.</Header>
        <Form.Group widths={2}>
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='x1'
            value={this.state.curveMid.x1}
            onChange={(e) => this.changeHandeler('curveMid', 'x1', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='y1'
            value={this.state.curveMid.y1}
            onChange={(e) => this.changeHandeler('curveMid', 'y1', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='z1'
            value={this.state.curveMid.z1}
            onChange={(e) => this.changeHandeler('curveMid', 'z1', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='x2'
            value={this.state.curveMid.x2}
            onChange={(e) => this.changeHandeler('curveMid', 'x2', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='y2'
            value={this.state.curveMid.y2}
            onChange={(e) => this.changeHandeler('curveMid', 'y2', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='z2'
            value={this.state.curveMid.z2}
            onChange={(e) => this.changeHandeler('curveMid', 'z2', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='speed'
            value={this.state.curveMid.speed}
            onChange={(e) => this.changeHandeler('curveMid', 'speed', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Input}
            type='text'
            placeholder='mid'
            value={this.state.curveMid.mid}
            onChange={(e) => this.changeHandeler('curveMid', 'mid', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Button}
            content='Send'
            onClick={() => this.sendCommand('curveMid')}
          />
        </Form.Group>

        <Header>Fly to coordinates (x1,y1,z1) of Mission Pad 1 and recognize coordinates (0,0,z) of Mission Pad 2 and rotate to the yaw value</Header>
        <Form.Group widths={2}>
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='x'
            value={this.state.jump.x}
            onChange={(e) => this.changeHandeler('jump', 'x', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='y'
            value={this.state.jump.y}
            onChange={(e) => this.changeHandeler('jump', 'y', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='z'
            value={this.state.jump.z}
            onChange={(e) => this.changeHandeler('jump', 'z', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='speed'
            value={this.state.jump.speed}
            onChange={(e) => this.changeHandeler('jump', 'speed', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Input}
            type='number'
            placeholder='yaw'
            value={this.state.jump.yaw}
            onChange={(e) => this.changeHandeler('jump', 'yaw', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Input}
            type='text'
            placeholder='mid1'
            value={this.state.jump.mid1}
            onChange={(e) => this.changeHandeler('jump', 'mid1', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Input}
            type='text'
            placeholder='mid2'
            value={this.state.jump.mid2}
            onChange={(e) => this.changeHandeler('jump', 'mid2', e.target.value)}
          />
          <Form.Field
            width={2}
            control={Button}
            content='Send'
            onClick={() => this.sendCommand('jump')}
          />
        </Form.Group>
      </Form>
    )
  }
}

const mapStateToProps = state => ({
  dist: state.drone.dist,
  speed: state.drone.speed
});

export default connect(mapStateToProps, null)(CustomCommands);
