import React from 'react';
import './Chat.css';
import ChatInput from "./ChatInput";
import ChatHistory from "./ChatHistory";

/**
 * Chat contains the chat history and chat input
 */
class Chat extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Chat">
                <ChatHistory socket={this.props.socket}/>
                <ChatInput socket={this.props.socket}/>
            </div>
        );
    }
}

export default Chat;
