var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server),
  core = require('./core'), count = 0;

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
	
	//User's action
	socket.on('saveUser', function(data) {
		socket.emit('savedUser', core.setUser(data));
		
		console.log('LOG::saveUser', data);
	});
	socket.on('removeUser', function(data) {
		socket.emit('removedUser', core.removeUserById(data.user.id));
		
		console.log('LOG::removeUser', data);
	});
	socket.on('getUserById', function(data) {
		socket.emit('reqUser', core.getUserById(data.user.id));
		
		console.log('LOG::getUserById', data);	
	});
	socket.on('getUsers', function() {
		socket.emit('resUsers', core.getStoredUsers());
		
		console.log('LOG::getUsers');
	});
});
