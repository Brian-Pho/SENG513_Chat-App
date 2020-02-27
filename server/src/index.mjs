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

// TODO: Chat history / log
const chatHistory = [];

// TODO: Connected users list
const onlineUsers = [];

socketIo.on('connection', (socket) => {
    // TODO: Assign unique nickname and send to client
    const user = {
        name: `User${Math.round(Math.random() * 10)}`,
        color: `${Math.floor(Math.random()*16777215).toString(16)}`,
    };
    onlineUsers.push(user);
    console.log(user);
    socket.emit('user', user);

    // TODO: Send chat history
    socket.emit('chat history', chatHistory);
    // TODO: Send online users
    socket.emit('online users', onlineUsers);
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        chatHistory.push(msg);
        // TODO: Add timestamp to messages
        msg.timestamp = moment().unix();
        // TODO: Check if message is a command
        console.log(msg);
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
