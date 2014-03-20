$('document').ready(function() {
	var socket = io.connect('http://localhost');
	var Solver = new function() {
		this.ui = {
			answers: $('#answers'),
			problem: $('#problem'),
			lis: { one: $('#one'), two: $('#two'), three: $('#three') },
			userForm: $('#user-form'),
			exist: $('#exist'),
			nonExist: $('#non-exist'),
			score: $('#score span')
		};
		this.currentUser = null;
		this.count = 0;
		this.data = null;
		this.updateHTML = function(data) {
			this.data = data;
			var arr = this.shuffle();

			this.ui.problem.html(data.a + ' + ' + data.b + ' = ?');			
			this.ui.lis.one.html(arr[0]);
			this.ui.lis.two.html(arr[1]);
			this.ui.lis.three.html(arr[2]);
		};
		this.shuffle = function() {
			var fake = this.data.fake;
			for(var j, x, i = fake.length; i; j = Math.floor(Math.random() * i), x = fake[--i], fake[i] = fake[j], fake[j] = x);
			return fake;
		};
		this.newUser = function(user) {
			if(user) {
				this.ui.exist.fadeToggle();
				this.ui.nonExist.fadeToggle();
				this.currentUser = user;
				this.updateStorage();
			}	
		}
		this.updateStorage = function() {
			var item = localStorage.getItem('users');
			var storage = item ? JSON.parse(item) : {};
			var ID = this.currentUser.id; 
			var NAME = this.currentUser.name;
			var SCORE = this.count;
			storage[ID] = {
				name: NAME,
				score: SCORE
			};
			localStorage.setItem('users', JSON.stringify(storage));
		};
		this.updateCount = function() {
			this.count++;
			this.ui.score.html(this.count);
			this.updateStorage();
		};
		this.clearCount = function() {
			this.count = 0;
			this.ui.score.html(this.count);
			this.updateStorage();
		}
		this.init = function() {
			this.ui.answers.on('click', 'li', function() {
                if( $(this).html() == Solver.data.solution ) { 
                        Solver.updateCount();
                } else {
                        Solver.clearCount();
                }          

                socket.emit('genNewNum', JSON.parse( localStorage.getItem('users') ));
            });
			this.ui.userForm.on('submit', function(event) {
				event.preventDefault();
				var user = {
					name: $(this).find('input[name=username]').val() 
				};

				socket.emit('saveUser', user);
			});
		};
	};

	Solver.init();

	socket.on('numberGen', function(data) { Solver.updateHTML(data); });
	socket.on('savedUser', function(data) { Solver.newUser(data); });
});
