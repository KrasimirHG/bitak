import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Navigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import PublishIcon from '@mui/icons-material/Publish';

import { addItem } from '../actions/itemActions';

class ItemUpload extends Component {
    constructor(props) {
        super();
        this.state = {
            name: '',
            description: '',
            img: null
        };
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onImageChange = (e) => {
        this.setState({ img: e.target.files });
        console.log(e.target.files);
    };

    onSubmit = (e) => {
        e.preventDefault();
        const {name, description, img} = this.state;
        this.props.addItem(name, description, img);
        // this.setState({shouldRediretToHome: true});
    };

    render() {
        if (this.props.shouldRedirect) return <Navigate replace to='/'/>;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <PublishIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Upload Item
                    </Typography>
                    <form
                        noValidate
                        onSubmit={this.onSubmit}
                        method="post"
                        encType="multipart/form-data"
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="name"
                                    autoFocus
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="description"
                                    label="description"
                                    name="description"
                                    onChange={this.onChange}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <input
                                    accept="image/*"
                                    id="raised-button-file"
                                    multiple
                                    type="file"
                                    onChange={this.onImageChange}
                                />
                                <div>
                                    The images format must be png ,
                                    jpeg, jpg or tiff
                                </div>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Upload
                        </Button>
                    </form>
                </Box>
            </Container>
        );
    }
}

ItemUpload.propTypes = {
    addItem: PropTypes.func,
    shouldRedirect: PropTypes.bool
};

const mapStateToProps = state => {
    return {
        items: state.items,
        shouldRedirect: state.shouldRedirect
    };
};

export default connect(mapStateToProps, {addItem})(ItemUpload);
