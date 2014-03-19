var Core = new function() {
	this.users = [];
	this.onProblemGenerated = [];
	this.runProblemGeneratedHandlers = function(){
		for(var i=0; i<onProblemGenerated.length; i++){
			this.onProblemGenerated[i]();
		}
	}
	this.problem = function() {
		var a = Math.ceil(Math.random()*101);
		var b = Math.ceil(Math.random()*101);
		var fakeA = Math.ceil(Math.random()*101);
		var fakeB = Math.ceil(Math.random()*101);
		var solution = a + b;

		return {a: a, b: b, fake: [fakeA, fakeB, solution], solution: solution };
	}
	this.setUser = function(user) {
		if(user) {
			this.users.push(user);
			return user
		} else {
			throw new Error('You need pass a user object!');
		}
	}
	this.getUserById = function(userID) {
		if(userID) {
			return this.users[userID];
		} else {
			throw new Error('You need pass a userID!');
		}
	}
	this.getUsers = function() {
		return this.users;
	}
	this.removeUserById = function(userID) {
		if(userID) {
			delete this.users[userID];
			
			return 'The user with id ' + userID + ' was deleted';
		} else {
			throw new Error('You need pass a userID!');
		}
	}
	this.saveUsers = function() {
		sessionStorage.setItem('users', this.users);
	}
	this.getStoredUsers = function() {
		$.parseJSON( sessionStorage.getItem('users') );
	}
};

module.exports = Core;
