$('document').ready(function() {
	var socket = io.connect('http://localhost');
	var Solver = new function() {
		this.data = null;
		this.answ = $('#answers');
		this.wrap = $('#problem');
		this.lis = { one: $('#one'), two: $('#two'), three: $('#three') };
		this.updateHTML = function(data) {
			this.data = data;
			var arr = this.shuffle();

			this.wrap.html(data.a + ' + ' + data.b + ' = ?');			
			this.lis.one.html(arr[0]);
			this.lis.two.html(arr[1]);
			this.lis.three.html(arr[2]);
		};
		this.shuffle = function() {
			var fake = this.data.fake;
			for(var j, x, i = fake.length; i; j = Math.floor(Math.random() * i), x = fake[--i], fake[i] = fake[j], fake[j] = x);
			return fake;
		};

		this.init = function() {
			this.answ.on('click', 'li', function() {
                                if( $(this).html() == Solver.data.solution ) { 
                                        socket.emit('genNewNum');
                                        console.log('INC');
                                } else { 
                                        socket.emit('clearCount');
                                        console.log('CLEAR');
                                }          
                        });
		}


	};

	Solver.init();
	socket.on('numberGen', function(data) { Solver.updateHTML(data); });
	socket.on('updateCounter', function(data) { $('#score span').html(data.count); });
});
