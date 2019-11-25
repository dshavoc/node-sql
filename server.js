
var io = require('socket.io').listen(11001);
const { exec } = require('child_process');


//Open SQL connection

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "dni",
  password: "password"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


 /*
  * SOCKET SETUP
  */
io.sockets.on('connection', function (socket) {

	socket.on('cmd', function (packet) {		// 'cmd' is arbitrary
		
		//Interact with SQL database (already opened)
		
		//Notify client, update data??
		var query = "SELECT * FROM testdb.exampleTable;";
        con.query(query, function (err, result) {
            if (err) throw err;
            console.log(result);
            
            socket.emit('sqlData', result);
            
        });
		
		
		socket.emit('ack', {msg: 'poked'});
		console.log("Sent ack");
	});

  //Acknowledge connection
  socket.emit('ack', {msg: 'connected'});								// 'hi' is as arbitrary as 'cmd'
});


function cleanup() {
    //Close SQL connection
    con.disconnect();   //TODO
}
