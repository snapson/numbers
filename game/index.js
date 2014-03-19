$('document').ready(function() {
	var socket = io.connect('http://localhost');
	var Solver = new function() {
		this.ui = {
			answers: $('#answers'),
			problem: $('#problem'),
			lis: { one: $('#one'), two: $('#two'), three: $('#three') },
			userForm: $('#user-form'),
			exist: $('#exist'),
			nonExist: $('#non-exist')
		};
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
				this.updateStorage(user);

				console.log('LOG::newUser::User has been saved!', user);
			}	
		}
		this.updateStorage = function(user) {
			var item = localStorage.getItem('users');
			var storage = item ? JSON.parse(item) : {};

			storage[user.name] = {
				id: user.id,
				score: user.score
			};
			console.log("LOG::updateStorage::storage", storage);
			localStorage.setItem('users', JSON.stringify(storage));
		}
		this.init = function() {
			this.ui.answers.on('click', 'li', function() {
				var user = JSON.parse( localStorage.getItem('users') );

                if( user && $(this).html() == Solver.data.solution ) { 
                        socket.emit('genNewNum', user);
                } else { 
                        socket.emit('clearCount', user);
                }          
            });
			this.ui.userForm.on('submit', function(event) {
				event.preventDefault();
				var user = {
					name: $(this).find('input[name=username]').val() 
				};

				socket.emit('saveUser', user);
			});
		}


	};
	Solver.init();

	socket.on('numberGen', function(data) { Solver.updateHTML(data); });
	socket.on('updateCounter', function(count) { console.log(count, "count"); $('#score span').html(count); });
	socket.on('savedUser', function(data) { Solver.newUser(data); });
});
