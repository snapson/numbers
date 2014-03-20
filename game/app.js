var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server),
  core = require('./core');

server.listen(8054);

//Add files
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/index.js', function (req, res) {
  res.sendfile(__dirname + '/index.js');
});

app.get('/style.css', function (req, res) {
  res.sendfile(__dirname + '/style.css');
});

io.sockets.on('connection', function (socket) {

	socket.on('genNewNum', function(user) {
		socket.emit('numberGen', core.problem());
	});
	
	//User's action
	socket.on('saveUser', function(user) {
		socket.emit('savedUser', core.setUser(user));
		socket.emit('numberGen', core.problem());
		console.log('LOG::APP::saveUser', user);
	});
	socket.on('removeUser', function(user) {
		socket.emit('removedUser', core.removeUserById(user.user.id));
		console.log('LOG::APP::removeUser', user);
	});
	socket.on('getUserById', function(user) {
		socket.emit('reqUser', core.getUserById(user.user.id));
		console.log('LOG::APP::getUserById', user);	
	});
	socket.on('getUsers', function() {
		socket.emit('resUsers', core.getUsers());
		console.log('LOG::APP::getUsers');
	});
});
