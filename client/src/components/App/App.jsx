import React from 'react';
import './App.css';
import {Col, Container, Row} from "react-bootstrap";
import Chat from "../Chat/Chat";
import Users from "../Users/Users";
import io from 'socket.io-client';

/**
 * App contains both the chat and users components
 */
class App extends React.Component {
    constructor(props) {
        super(props);
        // Connect to the socket.io server at this endpoint
        this.socket = io('http://localhost:3001');
        this.state = {user: {name: 'ERROR', color: 'ERROR'}};
    }

    componentDidMount() {
        this.socket.on('user', (user) => {
            this.setState({user: user});
        });
    }


    render() {
        return (
            <div className="App">
                <Container>
                    <Row>
                        <Col className="rounded">
                            <h2>Chat</h2>
                            <Chat socket={this.socket} user={this.state.user}/>
                        </Col>
                        <Col className="rounded">
                            <h2>Users</h2>
                            <Users socket={this.socket}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
