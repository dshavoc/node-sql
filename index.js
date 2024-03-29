var socket;

window.onload = function() {	//waits for entire code to be downloaded

  socket = io.connect('http://localhost:11001');

  //Check for socket connection
  if(socket) {
    appendOutput("Connection established");
    serverListener();
  }
  else {
    appendOutput("Connection rejected");
  }

  document.getElementById('btn').addEventListener(
    'click',
    function() {
          socket.emit(
              'cmd', {}
          );

          appendOutput("Sent measurement request");
      }
  );
};

function serverListener() {

    socket.on(
        'sqlData',
        function(data) {
            //Update Bootstrap UI as appropriate for this data
            
            appendOutput("sqlData has been received:");
            appendOutput(JSON.stringify(data));     //Debug value only. We'll operate on the object in its native form
            
            console.log(data);
            console.log(JSON.stringify(data));
            
        }
    );

    socket.on(
        'ack',
        function(payload) {
            appendOutput("ACK: " + payload.msg);
        }
    );
}
/*
    socket.on(
        'nack',
        function(msg) {
            appendOutput("NACK: " + msg);
        }
    );

    socket.on(
        'data',
        function(data) {
            clearOutput();
            appendOutput("Data: " + JSON.stringify(data));
            updateChart(data);
        }
    );

}
*/
function appendOutput(msg) {
    document.getElementById('output').innerHTML =
        document.getElementById('output').innerHTML
        + "<p>" + msg + "</p>";
}

function clearOutput() {
    document.getElementById('output').innerHTML = '';
}
