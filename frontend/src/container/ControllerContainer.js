import React, { Component } from 'react';
import { connect } from 'react-redux';
import Keypad from '../components/controller/Keypad';
// import Controller from '../components/Controller';
import JoyStickContainer from './JoystickContainer';
import Keyboard from '../components/controller/Keyboard'
import CustomCommands from '../components/controller/CustomCommands';
import SetCommands from '../components/controller/SetCommands';
import { Tab } from 'semantic-ui-react';
import { setDistance, setDegree } from '../actions/drone';

class ControllerContainer extends Component {
  panes = [
    { menuItem: 'Keypad', render: () => <Tab.Pane attached={false}><Keypad /></Tab.Pane> },
    { menuItem: 'Joystick', render: () => <Tab.Pane attached={false}><JoyStickContainer /></Tab.Pane> },
    { menuItem: 'Custom', render: () => <Tab.Pane attached={false}><CustomCommands /></Tab.Pane> },
    { menuItem: 'Set', render: () => <Tab.Pane attached={false}><SetCommands setDistanceAction={(dist) => this.props.setDistance(dist)} setDegreeAction={(degree) => this.props.setDegree(degree)}/></Tab.Pane> }
  ]

  render() {
    return (
      <Keyboard>
        <Tab menu={{ secondary: true }} panes={this.panes} />
      </Keyboard>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setDistance,
  setDegree,
})

export default connect(null, mapDispatchToProps)(ControllerContainer);
