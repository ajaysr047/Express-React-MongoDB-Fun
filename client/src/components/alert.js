import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class alert extends Component {
    constructor(props){
        super(props);

        this.state = {
            visibile: false
        };
    }
    onDismiss = () => {
        this.setState({ visibile: !this.state.visibile });
    }
    render() {
        return (
            <div>
                <Alert color="success" isOpen={this.state.visibile} toggle={this.onDismiss}>
                </Alert>
            </div>
        )
    }
}

export default alert;
