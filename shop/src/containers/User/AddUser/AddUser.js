import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';
import { connect } from 'react-redux';

import axios from '../../../base-axios';

class AddUser extends React.Component {
    state = {
        open: false,
        firstname: '',
        lastname: '',
        username: '',
        phone: '',
        password: ''
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleValueChange = (event) => {
        event.preventDefault();
        const value = event.target.value;
        switch (event.target.id) {
            case "firstname": this.setState({ ...this.state, firstname: value }); break;
            case "lastname": this.setState({ ...this.state, lastname: value }); break;
            case "username": this.setState({ ...this.state, username: value }); break;
            case "phone": this.setState({ ...this.state, phone: value }); break;
            case "password": this.setState({ ...this.state, password: value }); break;
            default: ;
        }
    }

    handleClickOK = () => {
        let data = {
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            userName: this.state.username,
            password: this.state.password,
            phoneNo: this.state.phone
        };
        // data = Object.keys(data).map(function (key) {
        //     return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        // }).join('&');
        axios.post('/users/v1.0/users/', data, {
            headers: { 'authorization': this.props.token }
        }).then(response => {
            // console.log(response.data);
            this.handleClose();
            this.props.addUserToData(data);
        }).catch((error) => {
            console.log('error ' + error);
        });
    }

    render() {
        return (
            <div>
                <PrimaryButton color="primary" onClick={this.handleClickOpen}>
                    Add User
                </PrimaryButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add User</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus margin="dense" id="firstname" label="First Name" fullWidth onChange={this.handleValueChange} />
                        <TextField autoFocus margin="dense" id="lastname" label="Last Name" fullWidth onChange={this.handleValueChange} />
                        <TextField autoFocus margin="dense" id="username" label="User Name" fullWidth onChange={this.handleValueChange} />
                        <TextField autoFocus margin="dense" id="password" label="password" type="password" fullWidth onChange={this.handleValueChange} />
                        <TextField autoFocus margin="dense" id="phone" label="Phone No" fullWidth onChange={this.handleValueChange} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleClickOK} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    };
};

export default connect(mapStateToProps, null)(AddUser);