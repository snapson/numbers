var socket = io.connect('http://192.168.4.137/');
var ui = {
	answers: $('#answers'),
	problem: $('#problem'),
	lis: { one: $('#one'), two: $('#two'), three: $('#three') },
	userForm: $('#user-form'),
	exist: $('#exist'),
	nonExist: $('#non-exist'),
	score: $('#score span')
};

console.log('LOG::User', User);
console.log('LOG::Solver', Solver);

Solver.init();

socket.on('numberGen', function(data) { Solver.updateHTML(data); });
socket.on('savedUser', function(data) { User.add(data); });
