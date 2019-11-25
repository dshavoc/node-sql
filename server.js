
var io = require('socket.io').listen(11001);
const { exec } = require('child_process');

 /*
  * SOCKET SETUP
  */
io.sockets.on('connection', function (socket) {

	socket.on('cmd', function (packet) {		// 'cmd' is arbitrary
		exec('python exanmple.py');
		socket.emit('ack', {msg: 'poked'});
		console.log("Sent ack");
	});

  //Acknowledge connection
  socket.emit('ack', {msg: 'connected'});								// 'hi' is as arbitrary as 'cmd'
});
