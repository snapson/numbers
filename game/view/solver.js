var Solver = new function() {
	this.count = 0;
	this.data = null;

	this.updateHTML = function(data) {
		this.data = data;
		var arr = this.shuffle();

		ui.problem.html(data.a + ' + ' + data.b + ' = ?');			
		ui.lis.one.html(arr[0]);
		ui.lis.two.html(arr[1]);
		ui.lis.three.html(arr[2]);
	};
	this.shuffle = function() {
		var fake = this.data.fake;
		for(var j, x, i = fake.length; i; j = Math.floor(Math.random() * i), x = fake[--i], fake[i] = fake[j], fake[j] = x);
		return fake;
	};
	this.updateCount = function() {
		this.count++;
		ui.score.html(this.count);
		this.updateStorage();
	};
	this.clearCount = function() {
		this.count = 0;
		ui.score.html(this.count);
		this.updateStorage();
	}
	this.updateStorage = function() {
		
	};
	this.init = function() {
		ui.answers.on('click', 'li', function() {
            if( $(this).html() == Solver.data.solution ) { 
                Solver.updateCount();
            } else {
                Solver.clearCount();
            }          

            socket.emit('genNewNum');
        });

		ui.userForm.on('submit', function(event) {
			event.preventDefault();
			var user = {
				name: $(this).find('input[name=username]').val() 
			};

			socket.emit('saveUser', user);
		});
	};
};