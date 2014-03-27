var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var testMe = {
    "index": 0,
    "guid": "1b191e9a-35c6-4ed7-9f6c-ecaee8cc06d6",
    "isActive": false,
    "balance": "$3,415.00",
    "picture": "http://placehold.it/32x32",
    "age": 34,
    "name": "Kim Brown",
    "gender": "male",
    "company": "Corepan",
    "email": "kimbrown@corepan.com",
    "phone": "+1 (983) 513-2727",
    "address": "620 Garnet Street, Heil, Hawaii, 9017",
    "about": "Laborum sit eu adipisicing elit esse adipisicing qui. Magna magna ea ea deserunt. Tempor laborum do culpa aliqua veniam pariatur magna occaecat elit duis voluptate ut nisi. Id quis cupidatat nostrud amet in incididunt adipisicing tempor sint aliquip excepteur commodo. Et occaecat commodo nostrud tempor incididunt nulla cupidatat quis non aliquip. Ad eu amet fugiat ut quis officia eu eiusmod.\r\n",
    "registered": "2002-08-30T11:44:01 -03:00",
    "latitude": -88.256456,
    "longitude": 154.852402,
    "tags": [
        "ipsum",
        "deserunt",
        "sint",
        "cupidatat",
        "nulla",
        "adipisicing",
        "commodo"
    ],
    "friends": [
        {
            "id": 0,
            "name": "Calhoun Christian"
        },
        {
            "id": 1,
            "name": "Alexandria Knapp"
        },
        {
            "id": 2,
            "name": "Keri Shannon"
        }
    ],
    "customField": "Hello, Kim Brown! You have 2 unread messages."
};


afterEach(function() {
  console.log(testMe.name, ' passed ');
});

describe('Test expected results', function() {
	it('should return true if testMe is object', function() {
		expect(testMe).to.be.a('object');
		testMe.name = 'object test';
	});

	describe('Check some property and length', function() {
		it('should return true if testMe have property with some length', function() {
			expect(testMe).to.have.property('tags').with.length(7);
			expect(testMe).to.have.property('friends').with.length(3);
			testMe.name = 'length test';
		});
	});

	it('should return true if testMe have property phone and pass the pattern /^\+1\s\(\d{3}\)\s\d{3}\-\d{4}/gs', function() {
		expect(testMe).to.have.property('phone');
		assert.match(testMe['phone'], /^\+1\s\(\d{3}\)\s\d{3}\-\d{4}/g);
		testMe.name = 'regexp test';
	});
});