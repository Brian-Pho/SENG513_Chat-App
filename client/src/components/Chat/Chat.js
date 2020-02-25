import React from 'react';
import './Chat.css';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

/**
 * Chat contains the received messages and the user's message
 */
class Chat extends React.Component {
    constructor(props) {
        super(props);
        // Create a React reference for text input
        this.textInput = React.createRef();
        this.socket = props.socket;
        this.state = {
            messages: ''
        };
    }

    /**
     * Sets up the socket.io listeners
     */
    componentDidMount() {
        this.socket.on('chat message', (msg) => this.receiveMsg(msg))
    }

    /**
     * Sends the user's message to the server
     */
    sendMsg() {
        this.socket.emit('chat message', this.textInput.current.value);
    }

    /**
     * Receives messages from the server
     * @param msg
     */
    receiveMsg(msg) {
        this.setState({messages: msg });
    }

    render() {
        return (
            <div className="Chat">
                <span>{this.state.messages}</span>
                <InputGroup className="mb-3">
                    <FormControl ref={this.textInput}/>
                    <InputGroup.Append>
                        <Button
                            variant="outline-secondary"
                            onClick={() => this.sendMsg()}
                        >Send
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        );
    }
}

export default Chat;
