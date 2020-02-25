const index = require('express')();
const http = require('http').createServer(index);
const io = require('socket.io')(http);

index.get('/', function(req, res){
    res.send("<p>Chat Server Page. This page isn't used for chatting.</p>");
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('chat message', function(msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen(3001, function(){
    console.log('listening on http://localhost:3001/');
});
