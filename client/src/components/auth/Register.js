import React, { Component } from "react";
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";

import { registerUser } from '../../actions/userActions';

const useStyles = makeStyles((theme) => ({
	"@global": {
		ul: {
			margin: 0,
			padding: 0,
			listStyle: "none",
		},
	},
	button: {
		color: "black",
		backgroundColor: "white",
		fontSize: "1.5rem",
		margin: theme.spacing(3, 3),
	},
	paper: {
		backgroundColor: 'white',
		padding: theme.spacing(2),
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.light,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

class ItModal extends Component {
	constructor() {
		super();
		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		};
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	submitForm = (e) => {
		e.preventDefault();
		const { firstName, lastName, email, password } = this.state;
		console.log("REestriran");
		this.props.registerUser(firstName, lastName, email, password);
	};

	render() {
		return (
			<Box>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<div className={this.props.paper}>
						<Avatar className={this.props.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Sign up
						</Typography>
						<form
							className={this.props.form}
							noValidate
							onSubmit={this.submitForm}
						>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										autoComplete="fname"
										name="firstName"
										variant="outlined"
										required
										fullWidth
										id="firstName"
										label="First Name"
										autoFocus
										onChange={this.handleChange}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="lastName"
										label="Last Name"
										name="lastName"
										autoComplete="lname"
										onChange={this.handleChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="email"
										label="Email Address"
										name="email"
										autoComplete="email"
										onChange={this.handleChange}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										name="password"
										label="Password"
										type="password"
										id="password"
										autoComplete="current-password"
										onChange={this.handleChange}
									/>
								</Grid>
							</Grid>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={this.props.submit}
							>
								Sign Up
							</Button>
						</form>
					</div>
				</Container>
			</Box>
		);
	}
}

function RegisterModal(props) {
	const classes = useStyles();
	if (props.shouldRedirect) return <Navigate replace to='/'/>;
	return (
		<ItModal
			button={classes.button}
			modal={classes.modal}
			paper={classes.paper}
			avatar={classes.avatar}
			form={classes.form}
			submit={classes.submit}
			registerUser={props.registerUser}
		/>
	);
}

const mapStateToProps = state => {
	return {
	  shouldRedirect: state.shouldRedirect
	}
  }


export default connect(mapStateToProps, { registerUser })(RegisterModal);