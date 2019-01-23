import React, { Component } from 'react';
import LeftJoyStick from '../components/controller/LeftJoystick';
import RightJoyStick from '../components/controller/RightJoystick';


class JoyStickContainer extends Component {
  render() {
    return (
      <div className="joystick-container">
        <div className="left-joystick">
          <LeftJoyStick />
        </div>
        <div className="right-joystick">
          <RightJoyStick />
        </div>
      </div>
    )
  }
}

export default JoyStickContainer;
