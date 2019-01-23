import wait from 'waait';
import commandDelays from './commandDelays';
import socket from '../socket';

let i = 0;
export async function sendCommands(sequence) {
  const command = sequence[i];
  const delay = commandDelays[command];
  console.log(`Sending command: ${command}`);
  socket.emit('command', command)
  await wait(delay);
  i += 1;
  if (i < sequence.length) {
    return sendCommands(sequence);
  }
}
