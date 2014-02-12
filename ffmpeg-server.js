var ffmpeg = require('fluent-ffmpeg');
var Metalib = require('fluent-ffmpeg').Metadata;
var websocket = require('websocket-stream');
var fs = require('fs');
var STREAM_MAGIC_BYTES = 'jsmp';

var video = new ffmpeg({ source: '../data/dbe49fba59c4884c5d4e088d1836ea18.mp4'});
video.withAspect('16:9');
video.withSize('1280x720');
video.applyAutopadding(true, 'black');
video.on('data', function(data){
	console.log('omg really');
});

console.log(video);

var socketServer = new (require('ws').Server)({port: 8023});
socketServer.on('connection', function(socket) {
	
	var streamHeader = new Buffer(8);
	streamHeader.write(STREAM_MAGIC_BYTES);
	streamHeader.writeUInt16BE(1280, 4);
	streamHeader.writeUInt16BE(720, 6);
	socket.send(streamHeader, {binary:true});

	console.log( 'New WebSocket Connection ('+socketServer.clients.length+' total)' );
	
	socket.on('close', function(code, message){
		console.log( 'Disconnected WebSocket ('+socketServer.clients.length+' total)' );
	});
});

socketServer.broadcast = function(data, opts) {
	for( var i in this.clients ) {
		this.clients[i].send(data, opts);
	}
};