var Result2Array = require('./Result2Array');
var fs = require('fs');
var http = require('http');
var http1 = require('http'); 
var http2 = require('http'); 
var util = require('util');
var appclient = require('http').createServer(handler),
  io = require('socket.io').listen(app),
  parser = new require('node-xml2json');

// creating the server ( localhost:8000 ) 
appclient.listen(8000);

// on server started we can load our client.html page
function handler(req, res) {
  fs.readFile(__dirname + '/client.html', function(err, data) {
    if (err) {
      console.log(err);
      res.writeHead(500);
      return res.end('Error loading client.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}



var httplogin = require('http').createServer(function handler(req, res) {
  fs.readFile(__dirname + '/login.html', function(err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading login.html');
    } else {
      res.writeHead(200);
      res.end(data);
    }
  });
}).listen(3000);
var httpclient = require('http').createServer(function handler(req, res) {
  fs.readFile(__dirname + '/client.html', function(err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    } else {
      res.writeHead(200);
      res.end(data);
    }
  });
}).listen(4000);
var httppost = require('http').createServer(function handler(request, response) {
  fs.readFile(__dirname + '/post.json', function(err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading post');
    } else {
		//connection.query('SELECT * FROM employees;', function (error, rows, fields) { 
			response.writeHead(200, { 
				'Content-Type': 'x-application/json' 
			}); 
			response.end(JSON.stringify(rows)); 
		}; 
	}); 
}).listen(8888);

EventEmitter = require('events').EventEmitter;

var Hose = function() {
  var self = this;
  require('net').createServer(function(socket) {
    socket.on('data', function(data) {
      self.emit('data', data);
    })
  }).listen(4001);
};

util.inherits(Hose, EventEmitter);

var hoserjson = new Hose();
require('http').createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'x-application/json'});
  hoserjson.on('data', function(data) {
    res.write(data);
  });
  
}).listen(4004);
exports.add_usernames = function(data, callback) {

  hoserjson.on('data', function(data) {
    // callback function returns last insert id
    callback(data.name);
    console.log(data.name); 
  });
};

// function to get list of employees
exports.get_usernames = function(callback) {
  		var req = http.request({
			hostname: 'http://localhost:4001',
			path: '/posts/1'
		}, function(response) {
			var data = '';
			response.on('data', function(httppost) {
				data += httppost;
			});
 
			response.on('end', function() {
				callback(null, JSON.parse(data));
			});
		});
 
		req.end();
  };


exports.post_usernames = function(data, callback) {
		var req = http.request({
			hostname: 'http://localhost:4004',
			path: '/posts',
			method: 'POST'
		}, function(response) {
			var data = '';
			response.on('data', function(chunk) {
				data += chunk;
			});
 
			response.on('end', function() {
				callback(null, JSON.parse(data));
			});
		});
 
		req.write(JSON.stringify(data));
 
		req.end();
}