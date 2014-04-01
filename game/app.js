var app = require('express')(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
  	Core = require('./model/core'),
  	User = require('./model/user');

server.listen(8054);

//Add files
app.get('/', function (req, res) {
  	res.sendfile(__dirname + '/view/index.html');
});
app.get('/style.css', function (req, res) {
  	res.sendfile(__dirname + '/view/style.css');
});
app.get('/index.js', function (req, res) {
  	res.sendfile(__dirname + '/view/index.js');
});
app.get('/solver.js', function (req, res) {
  	res.sendfile(__dirname + '/view/solver.js');
});
app.get('/user-action.js', function (req, res) {
  	res.sendfile(__dirname + '/view/user-action.js');
});

io.sockets.on('connection', function (socket) {

	socket.on('getCurrentProblem', function() {
		socket.emit('numberGen', Core.getCurrentProblem());
	});
	
	//User's action
	socket.on('saveUser', function(user) {
		socket.emit('savedUser', User.setUser(user));
		socket.emit('numberGen', Core.problem());
		console.log('LOG::APP::saveUser', user);
	});
	socket.on('removeUser', function(user) {
		socket.emit('removedUser', User.removeUserById(user.user.id));
		console.log('LOG::APP::removeUser', user);
	});
	socket.on('getUserById', function(user) {
		socket.emit('reqUser', User.getUserById(user.user.id));
		console.log('LOG::APP::getUserById', user);	
	});
	socket.on('getUsers', function() {
		socket.emit('resUsers', User.getUsers());
		console.log('LOG::APP::getUsers');
	});
});
