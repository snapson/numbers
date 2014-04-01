var Core = new function() {
	this.factorToProblem = function(factor){
	    var flag = factor.length/2;
	    var a = 1;
	    var b = 1;
	    var solution;
	    var str;
	    for(var i = 0; i < factor.length; i++){
	        if(i < flag){
	             a = a*factor[i];
	        } else {
	             b = b*factor[i];
	        }
	    }
	    solution = a * b;
	    str = " " + a + "*" + b;
	    return {
			a : a,
			b : b,
			solution : solution,
			operation : "*",
			str : str
		};	
	}
	this.numberToFactor = function(numtofact){
	    var array = [];
	    var newprime = "";
	    var checker = 2;                          
	    while (checker*checker <= numtofact) {      
	        if (numtofact % checker == 0){ 
	            newprime = newprime + checker;    
	            numtofact = numtofact/checker;      
	            if (numtofact != 1){
	               newprime = newprime + "*";  
	            }
	        }
	        else{
	            checker++;                        
	        }
	    }
	    if (numtofact != 1){                                     
	          newprime = newprime + numtofact;      
	    }
	    return newprime.split("*");
	}
	this.createMultiplicationProblem = function(number){
		var factor = Core.numberToFactor(number);
		var problem = Core.factorToProblem(factor);
		console.log(problem);
		return problem;
	}
	
	this.createProblem = function() {
		var number = Math.floor((Math.random()*100)+10);
		return Core.createMultiplicationProblem(number);	
	}
	this.createProblems = function(count){
		var chunk = [];
		for(var i=0; i<10; i++){
			var problem = Core.createProblem();
			chunk.push(problem);
		}
		return chunk;
	}
};

module.exports = Core;
