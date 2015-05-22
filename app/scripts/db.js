var Result2Array = require('./Result2Array');
var http = require('http');
var http1 = require('http'); 

http.createServer(function (request, response) { 
		//connection.query('SELECT * FROM employees;', function (error, rows, fields) { 
			response.writeHead(200, { 
				'Content-Type': 'x-application/json' 
			}); 
			response.end(JSON.stringify(rows)); 
		}); 
	//}); 
}).listen(8888);
http1.createServer(function (request, response) { 
		// Query the database. 
		//connection.query('SELECT * From employees for XML AUTO ("employee"), ROOT ("row"), ELEMENTS;;', function (error, rows, fields) { 
			response.writeHead(200, { 
				'Content-Type': 'x-application/xml' 
			}); 
			response.end(rows); 
		}); 
	//}); 
// Listen on the 8080 port. 
}).listen(8081);

exports.add_username = function(data, callback) {

    callback(info.insertId);
    console.log(data.name); 
  });


// function to get list of usernames
exports.get_usernames = function(callback) {
  		var req = http.request({
			hostname: 'http://localhost:3000',
			path: '/posts/1'
		}, function(response) {
			var data = '';
			response.on('data', function(chunk) {
				data += chunk;
			});
 
			response.on('end', function() {
				callback(null, JSON.parse(data));
			});
		});
 
		req.end();
  },


exports.post_usernames: function(data, callback) {
		var req = http.request({
			hostname: 'http://localhost:3000',
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
};