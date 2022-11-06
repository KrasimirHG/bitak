import React, { Component, Fragment } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';

export default function Pricing() {
    return (
        <Fragment>
            <CssBaseline />
            <AppBar
                position="static"
                color="default"
                elevation={0}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        color="inherit"
                        noWrap
                    >
                        Bitak
                    </Typography>
                    <Button>Register</Button>
                    <Button>Log In</Button>
                </Toolbar>
            </AppBar>
        </Fragment>
    );
}
