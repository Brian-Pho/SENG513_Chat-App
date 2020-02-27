import React from "react";
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
        const userColor = {
            color: `#${msg.user.color}`
        };

        let userMsg = (<><span style={userColor}>{msg.user.name}</span>: {msg.text}</>);

        console.log(msg.user, this.state.user);
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