const index = require('express')();
const http = require('http').createServer(index);
const io = require('socket.io')(http);

index.get('/', function(req, res){
    res.send("<p>Chat Server Page. This page isn't used for chatting.</p>");
});

// TODO: Chat history / log
// TODO: Connected users list

io.on('connection', function(socket){
    // TODO: Assign unique nickname and send to client
    // TODO:Send chat history
    // TODO: Send online users
    console.log('a user connected');
    socket.on('chat message', function(msg) {
        // TODO: Check if message is a command
        console.log('message: ' + msg);
        // TODO: Add timestamp to messages
        io.emit('chat message', msg);
    });

    socket.on('disconnect', function(){
        // TODO: Send online users
        console.log('user disconnected');
    });
});

http.listen(3001, function(){
    console.log('listening on http://localhost:3001/');
});
