import React from "react";
import moment from "moment";
import './ChatHistory.css';

class ChatHistory extends React.Component {
    constructor(props) {
        super(props);
        this.socket = props.socket;
        this.state = {
            history: [],
            user: props.user,
        };
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if  (prevProps.user !== this.props.user) {
            this.setState({user: this.props.user});
        }
    }

    addMsgToHistory(msg) {
        this.setState((state) => ({
            history: state.history.concat(msg)
        }))
    }

    formatUserMsg(msg, index) {
        // Get the message user's color
        const userColor = {color: `#${msg.user.color}`};
        // Get the message timestamp and format it
        const timestamp = moment.unix(msg.timestamp).format("H:m");
        // Build the message to be display
        let userMsg = (<>{timestamp} <span style={userColor}>{msg.user.name}</span>: {msg.text}</>);

        // If the message was sent by the user, bold the message
        if (JSON.stringify(msg.user) === JSON.stringify(this.state.user)) {
            userMsg = (<b>{userMsg}</b>);
        }

        return (
            <p key={index}>{userMsg}</p>
        );
    }

    render() {
        return (
            <div className="ChatHistory p-3 rounded">
            {this.state.history.slice(0).reverse().map((msg, index) => this.formatUserMsg(msg, index))}
            </div>
        );
    }
}

export default ChatHistory;