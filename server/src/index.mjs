import express from 'express';
import http from 'http';
import io from 'socket.io';
import moment from "moment";

const index = express();
const server = http.createServer(index);
const socketIo = io(server);

index.get('/', (req, res) => {
    res.send("<p>Chat Server Page. This page isn't used for chatting.</p>");
});

class User {
    constructor(nickname, color) {
        this.nickname = nickname;
        this.color = color
    }
}

// TODO: Chat history / log
const chatHistory = [];

// TODO: Connected users list
const onlineUsers = [];

socketIo.on('connection', (socket) => {
    // TODO: Assign unique nickname and send to client
    socket.emit('userNickname', `${Math.round(Math.random() * 10)}`);
    socket.emit('userColor', 'RRGGBB');
    // TODO: Send chat history
    socket.emit('chat history', chatHistory);
    // TODO: Send online users
    socket.emit('online users', onlineUsers);
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        // TODO: Check if message is a command
        console.log('message: ' + msg);
        // TODO: Add timestamp to messages
        socketIo.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        // TODO: Send online users
        console.log('user disconnected');
    });
});

server.listen(3001, () => {
    console.log('listening on http://localhost:3001/');
});
