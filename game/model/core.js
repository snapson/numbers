var Core = new function() {
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
};

module.exports = Core;
