import dgram from 'dgram';
import wait from 'waait';
import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import throttle from 'lodash/throttle';
import commandDelays from './commandDelays';

const HOST = '192.168.10.1';
const COMMAND_PORT = 8889;
const STATE_PORT = 8890;
const CAM_PORT = 11111;
const SOCKET_PORT = 8888;

let app = express();
let server = http.Server(app);
let io = new SocketIO(server);

const drone = dgram.createSocket('udp4');
drone.bind(COMMAND_PORT);

const droneState = dgram.createSocket('udp4');
droneState.bind(STATE_PORT);

// const droneCam = dgram.createSocket('udp4');
// droneCam.bind(CAM_PORT);


// droneCam.on('message', message => {
//   console.log(`DRONE CAM MESSAGE: ${message}`);
// })

// For UDP request, not response
function handleError(err) {
  if (err) {
    console.log(`ERROR: ${err}`);
  }
}

function parseState(state) {
  return state
    .split(';')
    .map(x => x.split(':'))
    .reduce((data, [key, value]) => {
      data[key] = value;
      return data;
    }, {});
}


// const sequence = ['command', 'battery?', 'takeoff', 'land'];
const sequence = ['command'];

let i = 0
async function go() {
  const command = sequence[i];
  const delay = commandDelays[command];
  console.log(`Sending command: ${command}`);
  drone.send(command, 0, command.length, COMMAND_PORT, HOST, handleError);
  await wait(delay);
  i += 1;
  if (i < sequence.length) {
    return go();
  }
}

go();

io.on('connection', socket => {
  console.log('User Connected');
  socket.emit('status', 'CONNECTED');
  
  socket.on('command', command => {
    console.log(`(browser): ${command}`);
    drone.send(command, 0, command.length, COMMAND_PORT, HOST, handleError);
  });



  socket.on('disconnect', () => {
    console.log('User Disconnected')
  })
});

drone.on('message', message => {
  console.log(`DRONE COMMAND MESSAGE: ${message}`);
  io.sockets.emit('status', message.toString());
});

droneState.on(
  'message',
  throttle(state => {
    const formattedState = parseState(state.toString());
    // console.log(formattedState)
    io.sockets.emit('droneState', formattedState);
  }, 100)
);

server.listen(SOCKET_PORT, () => {
  console.log(`Socket io server up and running on port ${SOCKET_PORT}`);
});
