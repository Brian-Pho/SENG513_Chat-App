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
        this.state = {userInfo: props.userInfo};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if  (prevProps.userInfo !== this.props.userInfo) {
            this.setState({userInfo: this.props.userInfo});
        }
    }

    render() {
        return (
            <div className="Chat">
                <p>{this.state.userInfo.userName} {this.state.userInfo.userColor}</p>
                <ChatHistory socket={this.props.socket} userInfo={this.state.userInfo}/>
                <ChatInput socket={this.props.socket} userInfo={this.state.userInfo}/>
            </div>
        );
    }
}

export default Chat;
