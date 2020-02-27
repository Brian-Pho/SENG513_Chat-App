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
        this.state = {userInfo: props.userInfo};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if  (prevProps.userInfo !== this.props.userInfo) {
            this.setState({userInfo: this.props.userInfo});
        }
    }

    /**
     * Sends the user's message to the server
     */
    sendMsg() {
        const msg = {
            userInfo: this.state.userInfo,
            text: this.textInput.current.value,
        };
        this.socket.emit('chat message', msg);
    }

    render() {
        return (
            <div className="ChatInput">
                <InputGroup className="mb-3">
                    <FormControl ref={this.textInput}/>
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
