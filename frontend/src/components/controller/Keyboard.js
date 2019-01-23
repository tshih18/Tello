import React, { Component } from 'react';
import socket from '../../socket';
import { connect } from 'react-redux';

class Keyboard extends Component {
  constructor(props) {
    super(props);
    this.keyPress = this.keyPress.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.keyPress)
  }

  keyPress(e) {
    // console.log(e)
    if (e.shiftKey && e.key === ' ') {
      socket.emit('command', 'takeoff')
    } else if (e.key === ' ') {
      socket.emit('command', 'land')
    } else if (e.key === 'Escape') {
      socket.emit('command', 'emergency')
    } else if (e.key === 'w') {
      socket.emit('command', `forward ${this.props.dist}`)
    } else if (e.key === 'a') {
      socket.emit('command', `left ${this.props.dist}`)
    } else if (e.key === 's') {
      socket.emit('command', `back ${this.props.dist}`)
    } else if (e.key === 'd') {
      socket.emit('command', `right ${this.props.dist}`)
    } else if (e.key === 'ArrowLeft') {
      socket.emit('command', `ccw ${this.props.degree}`)
    } else if (e.key === 'ArrowRight') {
      socket.emit('command', `cw ${this.props.degree}`)
    } else if (e.key === 'ArrowUp') {
      socket.emit('command', `up ${this.props.dist}`)
    } else if (e.key === 'ArrowDown') {
      socket.emit('command', `down ${this.props.dist}`)
    } else if (e.shiftKey && e.key === 'w') {
      socket.emit('command', 'flip f')
    } else if (e.shiftKey && e.key === 'a') {
      socket.emit('command', 'flip l')
    } else if (e.shiftKey && e.key === 's') {
      socket.emit('command', 'flip b')
    } else if (e.shiftKey && e.key === 'd') {
      socket.emit('command', 'flip r')
    }

  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  dist: state.drone.dist,
  degree: state.drone.degree
})

export default connect(mapStateToProps, null)(Keyboard);
