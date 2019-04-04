import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';

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
                        <TextField autoFocus margin="dense" id="firstname" label="First Name" fullWidth onChange={(e) => console.log(e.target.value)} />
                        <TextField autoFocus margin="dense" id="lastname" label="Last Name" fullWidth />
                        <TextField autoFocus margin="dense" id="username" label="User Name" fullWidth />
                        <TextField autoFocus margin="dense" id="password" label="password" type="password" fullWidth />
                        <TextField autoFocus margin="dense" id="phone" label="Phone No" fullWidth />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AddUser;