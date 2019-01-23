import React, { Component } from 'react';
// import Player from '../scripts/Player';
// import '../scripts/Player.js'
// import '../scripts/Decoder.js'
// import '../scripts/YUVCanvas.js'
// import '../scripts/stream.js'
// import '../scripts/mp4.js'
import NodeTello from '../lib/nodetello';
import NodeTello_webclient from '../lib/nodetello_webclient';

class VideoStream extends Component {
  constructor(props) {
    super(props);

    // var webclient = new NodeTello_webclient('ffmpeg');	// in-browser video
    // // var webclient = new NodeTello_webclient('mplayer');	// open mplayer window with low latency video
    // webclient.init();
    //
    //
    // var drone = new NodeTello();
    // // drone.save_video_path = "./video";
    // // drone.save_photo_path = "./photo/";
    // drone.tello_video_output = function (h264) { webclient.h264encoder_in(h264) };
    // drone.tello_telemetry_config = {
    // 	px: "MVO.PX",
    // 	py: "MVO.PY",
    // 	pz: "MVO.PZ"
    // };
    // drone.tello_telemetry_output = function (data) { webclient.telemetry_in(data); };
    // drone.init();
    //
    // webclient.tello_cmd = function (data) { drone.tello_cmd(data); }
  }

  render() {
    return (
      <div id='videoFeed'></div>
    );
  }
}

export default VideoStream;
