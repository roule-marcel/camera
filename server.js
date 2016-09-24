var WebSocketServer = require('ws').Server;

var A = null;
var B = null;
var wss = new WebSocketServer({port: 3434});

wss.broadcast = function(data) {
    for(var i in this.clients) {
        this.clients[i].send(data);
    }
};

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

    ws.on('message', function(message) {
        console.log('received: %s', message);
        wss.broadcast(message);
    });
});
