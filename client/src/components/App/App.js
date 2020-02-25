import React from 'react';
import './App.css';
import {Col, Container, Row} from "react-bootstrap";
import Chat from "../Chat/Chat";
import Users from "../Users/Users";
import io from 'socket.io-client';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            endpoint: ""
        }
    }

    componentDidMount() {
        const socket = io(this.state.endpoint);
    }

    render() {
        return (
            <div className="App">
                <Container>
                    <Row>
                        <Col>
                            <h1 className="display-4">Chat</h1>
                            <Chat>a</Chat>
                        </Col>
                        <Col>
                            <h1 className="display-4">Users</h1>
                            <Users>b</Users>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
