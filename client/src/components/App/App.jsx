/**
 * Name: Brian Pho
 * UCID: 10171873
 * Tutorial section: B03
 */
import React from 'react';
import io from 'socket.io-client';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './App.css';
import Chat from "../Chat/Chat";
import Users from "../Users/Users";

/**
 * App contains both the chat and users components
 */
class App extends React.Component {
    constructor(props) {
        super(props);
        // Connect to the socket.io server at this endpoint
        this.socket = io('http://localhost:3001');
        this.state = {user: {name: '', color: ''}};
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
