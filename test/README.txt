
MOCHA TESTING

npm install -g mocha
npm install --save-dev supertest chai
mocha -w test/*.js



The simplest unit test:
var io = require('../socket.io').io;
clientApp = require('./app.js');

Test with command prompt:
var server = exports.server = http.createServer(app).listen(app.get('port'), function(){
console.log(app.get('port'));
});
var io = require('socket.io').listen(server);
io.set("log level", 0);
// the important parts of echo server
io.sockets.on("connection", function (socket) {
socket.on("echo", function (msg, callback) {
callback = callback || function () {};
socket.emit("echo", msg);
callback(null, "Done.");
});
});
http://localhost:3000 and try in the console:
var socket = io.connect("http://localhost:3000")
socket.on("echo", function (msg) { console.log(msg); })
SocketNamespace
socket.emit("echo", "Hello World")
SocketNamespace
Hello World

---------------------
---------------------

JASMINE TESTING
https://github.com/jasmine/jasmine-npm
npm install -D jasmine

npm install -g jasmine
jasmine init
jasmine