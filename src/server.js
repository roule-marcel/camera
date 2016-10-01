var WebSocketServer = require('ws').Server;

var A = null;
var B = null;
var wss = new WebSocketServer({port: 3434});

wss.on('connection', function(ws) {
	if(A===null) {
		A = ws;
		A.on('message', function(message) {
	        console.log('A->B : %s', message);
	        if(B) B.send(message);
	    });
	}
	else if(B===null) {
		B = ws;
		B.on('message', function(message) {
	        console.log('B->A : %s', message);
	        if(A) A.send(message);
	    });
	}
});
