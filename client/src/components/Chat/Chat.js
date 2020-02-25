import React from 'react';
import './Chat.css';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

class Chat extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Chat">
                <span>asd</span>
                <InputGroup className="mb-3">
                    <FormControl/>
                    <InputGroup.Append>
                        <Button variant="outline-secondary">Send</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        );
    }
}

export default Chat;
