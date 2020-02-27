import express from 'express';
import http from 'http';
import io from 'socket.io';
import moment from "moment";
import {handleCommand, isValidCommand} from "./commands.mjs";

const index = express();
const server = http.createServer(index);
const allSockets = io(server);

index.get('/', (req, res) => {
    res.send("<p>Chat Server Page. This page isn't used for chatting.</p>");
});

const chatHistory = [];
// TODO: Fix bug where disconnecting original user causes all other users to lose online list
const onlineUsers = [];

allSockets.on('connection', (socket) => {
    // Autogenerate the connected user
    const user = {
        name: `User${Math.round(Math.random() * 10)}`,
        color: `${Math.floor(Math.random() * 16777215).toString(16)}`,
    };
    onlineUsers.push(user);

    socket.emit('user', user);
    console.log('user connected: ' + JSON.stringify(user));
    socket.emit('chat history', chatHistory);
    allSockets.emit('online users', onlineUsers);

    socket.on('chat message', (msg) => {
        // Add the message to the chat history
        chatHistory.push(msg);
        // Calculate message timestamp
        msg.timestamp = moment().unix();
        console.log('msg: ' + JSON.stringify(msg));
        allSockets.emit('chat message', msg);
    });

    socket.on('chat command', (cmd) => {
        console.log('cmd: ' + cmd);
        const serverResponse = {
            user: {name: "Server", color: "000000"},
            text: "Successfully handled the command.",
            timestamp: moment().unix(),
        };

        try {
            isValidCommand(cmd, onlineUsers);
            handleCommand(cmd, user, onlineUsers);
            allSockets.emit('online users', onlineUsers);
            socket.emit('chat command', serverResponse);
            socket.emit('user', user);
        }
        catch (err) {
            serverResponse.text = `Error handling command: ${err}`;
            socket.emit('chat command', serverResponse);
        }
    });

    socket.on('disconnect', () => {
        // Remove the user from the online users list
        const disconnectedUserIndex = onlineUsers.indexOf(user);
        onlineUsers.splice(disconnectedUserIndex);

        // Tell all clients to update their online user list
        allSockets.emit('online users', onlineUsers);
        // console.log(onlineUsers);
        console.log('user disconnected: ' + JSON.stringify(user));
    });
});

server.listen(3001, () => {
    console.log('listening on http://localhost:3001/');
});
