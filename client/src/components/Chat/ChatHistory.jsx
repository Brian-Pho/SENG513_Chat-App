import React from "react";
import './ChatHistory.css';

class ChatHistory extends React.Component {
    constructor(props) {
        super(props);
        this.socket = props.socket;
        this.state = {
            history: [],
            userInfo: props.userInfo,
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
        if  (prevProps.userInfo !== this.props.userInfo) {
            this.setState({userInfo: this.props.userInfo});
        }
    }

    addMsgToHistory(msg) {
        this.setState((state) => ({
            history: state.history.concat(msg)
        }))
    }

    formatUserMsg(msg, index) {
        let userMsg = (<>{msg.userInfo.userName}: {msg.text}</>);
        console.log(msg.userInfo, this.state.userInfo);
        if (JSON.stringify(msg.userInfo) === JSON.stringify(this.state.userInfo)) {
            userMsg = (<b>{userMsg}</b>);
        }

        return (
            <p key={index}>{userMsg}</p>
        );
    }

    render() {
        return (
            <div className="ChatHistory p-3">
            {this.state.history.slice(0).reverse().map((msg, index) => this.formatUserMsg(msg, index))}
            </div>
        );
    }
}

export default ChatHistory;