import React, { Component, useState, useEffect } from 'react';
import { Grid, Table, Progress } from 'semantic-ui-react';
import socket from '../socket';

export function useSocket() {
  const [status, updateStatus] = useState('DISCONNECTED');
  useEffect(() => {
    socket.on('status', updateStatus);
    return () => socket.removeListener('status');
  }, []);
  return status;
}

export function useDroneState() {
  const [droneState, updateDroneState] = useState({});
  useEffect(() => {
    socket.on('droneState', updateDroneState);
    return () => socket.removeListener('droneState');
  }, []);
  return droneState;
}

const DroneDash = () => {
  const status = useSocket();
  const droneState = useDroneState([]);

  return (
    <Grid>
      <Progress percent={droneState.bat || 100} color='blue' progress='percent'/>
      <Grid.Row columns={5}>
        <Grid.Column>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan='2'>Position (cm)</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>x</Table.Cell>
                <Table.Cell>{droneState.x || 0}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>y</Table.Cell>
                <Table.Cell>{droneState.y || 0}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>z</Table.Cell>
                <Table.Cell>{droneState.z || 0}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>

        <Grid.Column>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan='2'>Velocity (cm/s)</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>x</Table.Cell>
                <Table.Cell>{droneState.vgx || 0}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>y</Table.Cell>
                <Table.Cell>{droneState.vgy || 0}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>z</Table.Cell>
                <Table.Cell>{droneState.vgz || 0}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>

        <Grid.Column>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan='2'>Acceleration (cm/s/s)</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>x</Table.Cell>
                <Table.Cell>{droneState.agx || 0}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>y</Table.Cell>
                <Table.Cell>{droneState.agy || 0}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>z</Table.Cell>
                <Table.Cell>{droneState.agz || 0}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>

        <Grid.Column>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan='2'>Axial Spin</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Pitch</Table.Cell>
                <Table.Cell>{droneState.pitch || 0}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Roll</Table.Cell>
                <Table.Cell>{droneState.roll || 0}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Yaw</Table.Cell>
                <Table.Cell>{droneState.yaw || 0}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>

        <Grid.Column>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan='2'>Temperature (C)</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>low</Table.Cell>
                <Table.Cell>{droneState.templ || 0}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>high</Table.Cell>
                <Table.Cell>{droneState.temph || 0}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>Status: {status}</Grid.Row>
      <Grid.Row>Battery: {droneState.bat || 0}% </Grid.Row>
      <Grid.Row>Height: {droneState.h || 0} cm</Grid.Row>
      <Grid.Row>Pressure: {droneState.baro || 0} cm</Grid.Row>
      <Grid.Row>Motors on Time: {droneState.time || 0} s</Grid.Row>
      <Grid.Row>Time of Flight Distance: {droneState.tof || 0} cm</Grid.Row>
      <Grid.Row>Mission Pad ID: {droneState.mid || 0}</Grid.Row>
      <Grid.Row>MPRY: {droneState.mpry || 0} cm</Grid.Row>
    </Grid>
  )
}


export default DroneDash;
