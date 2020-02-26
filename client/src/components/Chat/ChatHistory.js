import React from "react";

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
            console.log("1" + msg);
            this.setState((state, props) => {
                history: state.history.concat(msg)
            })
        });
    }

    render() {
        return (<p>fdsa</p>);
    }
}

export default ChatHistory;