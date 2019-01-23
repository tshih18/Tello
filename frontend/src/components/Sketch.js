import React, { Component, useState, useEffect } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import socket from '../socket';

let coord = {};

export function useDroneState() {
  const [droneState, updateDroneState] = useState({});
  useEffect(() => {
    socket.on('droneState', updateDroneState);
    return () => socket.removeListener('droneState');
  }, []);
  return droneState;
}

export function sketch(p) {
  let rotateX = 0;
  let rotateY = 0;
  let rotateSpeed = 0.01;
  let coordLine = 100;
  let vertices = [];

  p.setup = () => {
    p.createCanvas(600, 400, p.WEBGL);
    p.angleMode(p.DEGREES);
  }

  // p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
  //   if (props.rotation){
  //     rotation = props.rotation * Math.PI / 180;
  //   }
  // };

  p.draw = () => {
    // setup canvas
    p.background(0);
    p.rotateX(p.PI);
    p.translate(0, -100);

    // add vertices to shape
    if (coord.x && coord.y && coord.z) {
      vertices.push(coord)
    }

    p.rotateX(-rotateY)
    p.rotateY(-rotateX)

    p.push();
    p.drawCoord();
    p.noFill();
    p.stroke('white');
    p.sphere(20);

    p.drawPath();


    p.pop();
  };

  p.mouseDragged = (e) => {
    rotateX += e.movementX*rotateSpeed;
    rotateY += e.movementY*rotateSpeed;
  }

  p.drawCoord = () => {
    p.stroke('red')
    p.line(0,0,0,coordLine,0,0);
    p.stroke('green')
    p.line(0,0,0,0,coordLine,0);
    p.stroke('blue')
    p.line(0,0,0,0,0,coordLine);
  }

  p.drawPath = () => {
    p.beginShape();
    vertices.map((vertex) => {
      p.vertex(vertex.x, vertex.y, vertex.z)
    })
    p.endShape();
  }
};

const Sketch = () => {
    const droneState = useDroneState([]);
    console.log(droneState)
    coord = {
      x: droneState.x || null,
      y: droneState.y || null,
      z: droneState.z || null
    }
    return (
      <P5Wrapper sketch={sketch} />
    )

}

export default Sketch;
