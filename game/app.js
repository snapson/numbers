var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server),
  core = require('./core'), count = 0, counts = {};

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
		counts[user.name]++;
		
		socket.emit('updateCounter', counts[user.name]);
	});

	socket.on('clearCount', function(user) {
		socket.emit('numberGen', core.problem());
		counts[user.name] = 0; 
		socket.emit('updateCounter', counts[user.name]);
	});
	
	//User's action
	socket.on('saveUser', function(user) {
		socket.emit('savedUser', core.setUser(user));

		counts[user.name] = 0;
		console.log('APP::saveUser', user);
		
		socket.emit('numberGen', core.problem());
	});
	socket.on('removeUser', function(user) {
		socket.emit('removedUser', core.removeUserById(user.user.id));
		delete counts[user.name];
		
		console.log('LOG::removeUser', user);
	});
	socket.on('getUserById', function(user) {
		socket.emit('reqUser', core.getUserById(user.user.id));
		
		console.log('LOG::getUserById', user);	
	});
	socket.on('getUsers', function() {
		socket.emit('resUsers', core.getUsers());
		
		console.log('LOG::getUsers');
	});
});
