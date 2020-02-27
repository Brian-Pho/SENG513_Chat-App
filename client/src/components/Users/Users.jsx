import React from 'react';
import './Users.css';

/**
 * Users contains the online users
 */
class Users extends React.Component {
    constructor(props) {
        super(props);
        this.socket = props.socket;
    }

    render() {
        return (
            <div className="Users">
                <span>asd</span>
            </div>
        );    }
}

export default Users;
