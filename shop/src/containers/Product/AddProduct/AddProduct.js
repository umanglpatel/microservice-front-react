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

class AddProduct extends React.Component {
    state = {
        open: false,
        name: '',
        brand: '',
        category: ''
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
            case "name": this.setState({ ...this.state, name: value }); break;
            case "brand": this.setState({ ...this.state, brand: value }); break;
            case "category": this.setState({ ...this.state, category: value }); break;
            default: ;
        }
    }

    handleClickOK = () => {
        let data = {
            name: this.state.name,
            brand: this.state.brand,
            category: this.state.category
        };
        // data = Object.keys(data).map(function (key) {
        //     return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
        // }).join('&');
        axios.post('/products/v1.0/products/', data, {
            headers: { 'authorization': localStorage.getItem('token') }
        }).then(response => {
            // console.log(response.data);
            this.handleClose();
            this.props.addProductToData(data);
        }).then(response => {
            this.setState({ ...this.state, name: null, brand: null, category: null })
        })
            .catch((error) => {
                console.log('error ' + error);
            });
    }

    render() {
        return (
            <div>
                <PrimaryButton color="primary" onClick={this.handleClickOpen}>
                    Add Product
                </PrimaryButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Add Product</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus margin="dense" id="name" label="Name" fullWidth onChange={this.handleValueChange} />
                        <TextField margin="dense" id="brand" label="Brand" fullWidth onChange={this.handleValueChange} />
                        <TextField margin="dense" id="category" label="Category" fullWidth onChange={this.handleValueChange} />
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

export default connect(mapStateToProps, null)(AddProduct);