var User = new function() {
	this.currentUser = null;

	this.add = function(user) {
		if(user) {
			ui.exist.fadeToggle();
			ui.nonExist.fadeToggle();
			this.currentUser = user;
			socket.emit('getUsers');
		}	
	}
}
