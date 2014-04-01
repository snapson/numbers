if (typeof chai == "undefined"){
	chai = require("chai");
}

var human = {
	name : "Nikita",
	age : 36,
	citizenship : ["Somali", "Ukraine"]
}

//should
//assert
//expect

chai.should();
var expect = chai.expect;
var assert = chai.assert;
describe("Nikita testing", function(){
	it("Name is string", function(){
		human.name.should.be.a("string");
	});
	it("Nikita age is more than 18-", function(){
		var isLessThen18 = human.age < 18 ? true : false;
		expect(isLessThen18).to.be.true;
	});
	it("Assert test that nikita has 2 citizenship and he is 16 years old", function(){
			var is16Years = human.age == 16 ? true : false;
			var citizenshipCount = human.citizenship.length == 2 ? true : false;
			assert(4);
	})
});


