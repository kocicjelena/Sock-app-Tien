/*global define */
define(['app-control'], function () {
    'use strict';

    /**
        Only want to set this up once for anywhere we want
        to use request animation frame
    **/
var fs = require('fs');
var db = require("./db.js");

var http = require('http').createServer(function handler(req, res) {
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
var http1 = require('http').createServer(function handler(req, res) {
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
var io = require('socket.io').listen(http);
io.sockets.on('connection', function(client) {
  console.log('Client connected'); 
  db.add_usernames(function(data) {
    client.emit('data', data);
  });
  // populate usernames on client
  db.get_usernames(function(usernames) {
    client.emit('populate', usernames);
  });
  
  // client add new username
  client.on('add username', function(data) {
    // create username, when its done repopulate usernames on client
    db.add_username(data, function(data) {
      // repopulate usernames on client
      db.get_usernames(function(usernames) {
        client.emit('populate', usernames);
      });
    });
  });
});
});