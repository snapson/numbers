var View = new function() {
	this.count = 0;
	this.data = null;
	this.socket = null;

	this.insertBlocks = function(){
		for(var i=0; i<args.problems.length; i++){
			var block = $("<div>",{
				id : "n-block-" + i,
				"class" : 'n-block',
				height : 50,
				width : 200
			}).css({				
				"border-style" : "solid",
				"border-width" : "5px"
			}).html(args.problems[i].str).appendTo(document.body);	

		}	
		console.log(args);
	}
	this.init = function() {
		this.socket = io.connect('http://localhost/');
		View.insertBlocks();
	}
};
View.init();

