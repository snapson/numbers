var Core = new function() {
	/*
	this.onProblemGenerated = [];
	this.runProblemGeneratedHandlers = function(){
		for(var i=0; i<onProblemGenerated.length; i++){
			this.onProblemGenerated[i]();
		}
	}
	*/

	this.users = [];
	this.problem = function() {
		var a = Math.ceil(Math.random()*101);
		var b = Math.ceil(Math.random()*101);
		var fakeA = Math.ceil(Math.random()*101);
		var fakeB = Math.ceil(Math.random()*101);
		var solution = a + b;

		return {
				a: a, 
				b: b, 
				fake: [fakeA, fakeB, solution], 
				solution: solution
			};
	}
	this.setUser = function(user) {
		if(user && user.id != this.users.length) {
			user.id = this.users.length;
			user.score = 0;
			this.users.push(user);
			
			console.log("CORE::setUser", user);	

			return user
		} else {
			throw new Error('You need pass a user object or user is already exist!');
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
};

module.exports = Core;
