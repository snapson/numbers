var app = require('express')(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
  	Core = require('./model/core'),
  	User = require('./model/user'),
  	jade = require('jade');

server.listen(8054);
//
//Add files
//
app.get('/', function (req, res) {
	var problems = Core.createProblems(10);	
  	var options = { data : { pageTitle : "JADE!!!", problems : problems } };
	var html = jade.renderFile('view/template.jade', options);
  	res.writeHeader(200, {"Content-Type": "text/html"});  
    res.write(html);  
    res.end(); 
});
app.get('/style.css', function (req, res) {
  	res.sendfile(__dirname + '/view/style.css');
});
app.get('/index.js', function (req, res) {
  	res.sendfile(__dirname + '/view/index.js');
});
/*
io.sockets.on('connection', function (socket) {
	socket.on('genNewNum', function() {
		socket.emit('numberGen', Core.problem());
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
*/
