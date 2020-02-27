import React from "react";
import './ChatHistory.css';

class ChatHistory extends React.Component {
    constructor(props) {
        super(props);
        this.socket = props.socket;
        this.state = {history: []};
    }

    /**
     * Sets up the socket.io listeners
     */
    componentDidMount() {
        this.socket.on('chat history', (chatHistory) => {
            this.setState({history: chatHistory})
        });

        this.socket.on('chat message', (msg) => {
            this.addMsgToHistory(msg);
        });
    }

    addMsgToHistory(msg) {
        this.setState((state) => ({
            history: state.history.concat(msg)
        }))
    }

    render() {
        return (
            <div className="ChatHistory">
            {this.state.history.slice(0).reverse().map((msg) => <p>{msg}</p>)}
            </div>
        );
    }
}

export default ChatHistory;