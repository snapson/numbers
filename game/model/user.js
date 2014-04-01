var User = new function() {
	this.users = new Object();

	this.setUser = function(user) {
		if(user) {
			this.users[user.name] = user;

			return user
		} else {
			throw new Error('You need pass a user object or user is already exist!');
		}
	}
	this.getUsers = function() {
		return this.users;
	}
	/*
	this.removeUserById = function(userID) {
		if(userID) {
			delete this.users[userID];
			
			return 'The user with id ' + userID + ' was deleted';
		} else {
			throw new Error('You need pass a userID!');
		}
	}
	*/
};

module.exports = User;
