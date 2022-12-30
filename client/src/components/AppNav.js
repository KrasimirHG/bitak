import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { logoutUser } from '../actions/userActions'

const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	toolbar: {
		flexWrap: 'wrap',
		backgroundColor: 'lightgrey',
	},
	toolbarTitle: {
		flexGrow: 1,
		color: 'navy',
	},
	link: {
		margin: theme.spacing(1, 1.5),
		color: '#aaffcc',
		border: '1px solid blue',
		backgroundColor: 'darkgrey',
	},
	item: {
		margin: theme.spacing(1)
	}
}));

function NavBar(props) {
	const classes = useStyles();

	return (
		<Fragment>
			<CssBaseline />
			<AppBar
				position='static'
				color='default'
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar className={classes.toolbar}>
					<Typography
						variant='h6'
						color='inherit'
						noWrap
						className={classes.toolbarTitle}
					>
						<Link style={{ textDecoration: 'none', color: 'inherit' }} to='/'>
						Bitak
						</Link>
					</Typography>
					{props.user?.token ?
					    <>
						<Link style={{ textDecoration: 'none', color: 'inherit' }} to='/addItem'>
							<Button variant='contained' color='primary' className={classes.item}>Add Item</Button>
						</Link>
					    <h4>Hello, {props.user.user.firstName}</h4>
						<Link style={{ textDecoration: 'none', color: 'inherit' }} to='/'>
							<Button color='inherit' onClick={props.logoutUser}>Logout</Button>
						</Link>
						</>
						: <>
							<Link style={{ textDecoration: 'none', color: 'inherit' }} to='/register'>
								<Button color='inherit' >Register</Button>
							</Link>
							<Link style={{ textDecoration: 'none', color: 'inherit' }} to='/login'>
								<Button color='inherit' >Log In</Button>
							</Link>
						</>}
				</Toolbar>
			</AppBar>
		</Fragment>
	);
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
};

export default connect(mapStateToProps, { logoutUser })(NavBar);
