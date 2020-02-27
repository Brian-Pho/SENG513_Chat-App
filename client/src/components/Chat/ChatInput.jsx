import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        // Create a React reference for text input
        this.textInput = React.createRef();
        this.socket = props.socket;
    }

    /**
     * Sends the user's message to the server
     */
    sendMsg() {
        this.socket.emit('chat message', this.textInput.current.value);
    }

    render() {
        return (
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
        );
    }
}

export default ChatInput;
