import React from 'react';
import axios from '../../base-axios';
import Paper from '@material-ui/core/Paper';

class Order extends React.Component {
    state = {
        message: 'Requesting...'
    };

    componentDidMount() {
        axios.get('/orders/v1.0/orders/test', {
            headers: { 'authorization': localStorage.getItem('token') }
        }).then(res => {
            this.setState({ ...this.state, message: res.data });
        }).catch((error) => {
            console.log('error ' + error);
        });
    }

    render() {
        return (
            <Paper>
                <br />
                <br />
                {this.state.message}
                <br />
                <br />
                <br />
            </Paper>
        );
    }
}

export default Order;