var fs = require('fs');
var db_helper = require("./db.js");

var http = require('http').createServer(function handler(req, res) {
  fs.readFile(__dirname + '/index.html', function(err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    } else {
      res.writeHead(200);
      res.end(data);
    }
  });
}).listen(3000);
// creating a new websocket to keep the content updated without any AJAX request

var io = require('socket.io').listen(http);
io.sockets.on('connection', function(client) {

  console.log('Client connected'); 
  console.log(__dirname);
  // watching the xml file
  fs.watch(__dirname + '/post.xml', function(curr, prev) {
    // on file change we can read the new xml
    fs.readFile(__dirname + '/post.xml', function(err, data) {
      if (err) throw err;
      // parsing the new xml data and converting them into json file
      var json = parser.toJson(data);
      // adding the time of the last update
      json.time = new Date();
      // send the new data to the client
      socket.volatile.emit('notification', json);
    });
  });
  // populate usernames on client
  db.get_usernames(function(usernames) {
    client.emit('populate', usernames);
  });
  
  // client add new username
  client.on('add username', function(data) {
    // create username, when its done repopulate usernames on client
    db.add_username(data, function(lastId) {
      // repopulate usernames on client
      db.get_usernames(function(usernames) {
        client.emit('populate', usernames);
      });
    });
  });
});









