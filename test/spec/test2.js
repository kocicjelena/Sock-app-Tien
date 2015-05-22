var assert = require('assert');
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;
var http = require('http');
 
var api = require('../app.js');
 
describe('api', function() {
	beforeEach(function() {
		this.request = sinon.stub(http, 'request');
	});
 
	afterEach(function() {
		http.request.restore();
	});
 
 
	it('testget_usernames', function(done) {
	var expected = { usernames: 'usernames' };
	var response = new PassThrough();
	response.write(JSON.stringify(expected));
	response.end();
 
	var request = new PassThrough();
 
	this.request.callsArgWith(1, response)
	            .returns(request);
 
	api.get(function(err, result) {
		assert.deepEqual(result, expected);
		done();
	});
});
	it('testpost_usernames', function() {
	var params = { usernames: 'usernames' };
	var expected = JSON.stringify(params);
 
	var request = new PassThrough();
	var write = sinon.spy(request, 'write');
 
	this.request.returns(request);
 
	api.post(params, function() {console.log(usernames;); });
 
	assert(write.withArgs(expected).calledOnce);
});
});