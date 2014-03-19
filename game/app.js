var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server),
  core = require('./core'), count = 0;

server.listen(8054);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {

	socket.emit('numberGen', core.problem());

	socket.on('genNewNum', function() {
		socket.emit('numberGen', core.problem());
		count++;
		
		socket.emit('updateCounter', { count : count });
	});

	socket.on('clearCount', function() {
		socket.emit('numberGen', core.problem());
		count = 0; 
		socket.emit('updateCounter', { count : count });
	});
});
