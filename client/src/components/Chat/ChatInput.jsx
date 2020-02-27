import React from "react";
import './ChatInput.css';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        // Create a React reference for text input
        this.textInput = React.createRef();
        this.socket = props.socket;
        this.state = {userInfo: props.user};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if  (prevProps.user !== this.props.user) {
            this.setState({user: this.props.user});
        }
    }

    /**
     * Sends the user's message to the server
     */
    sendMsg() {
        // If no message, don't do anything
        if (!this.textInput.current.value) {
            return;
        }

        const msg = {
            user: this.state.user,
            text: this.textInput.current.value,
        };
        this.socket.emit('chat message', msg);
        // Reset textInput to empty
        this.textInput.current.value = '';
    }

    render() {
        return (
            <div className="ChatInput rounded">
                <InputGroup className="mb-3">
                    <FormControl
                        ref={this.textInput}
                        onKeyPress={event => {
                            if (event.key === "Enter") {
                                this.sendMsg()
                            }
                        }}/>
                    <InputGroup.Append>
                        <Button
                            variant="outline-success"
                            onClick={() => this.sendMsg()}
                        >Send
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        );
    }
}

export default ChatInput;
