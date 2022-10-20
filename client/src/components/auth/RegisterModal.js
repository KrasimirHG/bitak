import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	"@global": {
		ul: {
			margin: 0,
			padding: 0,
			listStyle: "none",
		},
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	button: {
		color: "violet",
		backgroundColor: "darkgrey",
		fontSize: "1.5rem",
		margin: theme.spacing(3, 3),
	},
	paper: {
		backgroundColor: 'darkgrey',
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
			isOpen: false,
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		};
	}
	handleModal = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	submitForm = (e) => {
		e.preventDefault();
		console.log("REestriran");
		this.handleModal();
	};

	render() {
		return (
			<Box>
				<Button
					type="button"
					className={this.props.button}
					onClick={this.handleModal}
				>
					Register
				</Button>
				<Modal
					open={this.state.isOpen}
					onClose={this.handleModal}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					className={this.props.modal}
				>
					<Container component="main" maxWidth="xs">
						<CssBaseline />
						<div className={this.props.paper}>
							<Avatar className={this.props.avatar}>
								<LockOutlinedIcon />
							</Avatar>
							<Typography component="h1" variant="h5">
								Sign up
							</Typography>
							<form className={this.props.form} noValidate>
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
									<Grid item xs={12}>
										<FormControlLabel
											control={
												<Checkbox
													value="allowExtraEmails"
													color="primary"
												/>
											}
											label="I want to receive inspiration, marketing promotions and updates via email."
										/>
									</Grid>
								</Grid>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									className={this.props.submit}
									onSubmit={this.submitForm}
								>
									Sign Up
								</Button>
							</form>
						</div>
					</Container>
				</Modal>
			</Box>
		);
	}
}

export default function RegisterModal() {
	const classes = useStyles();
	return (
		<ItModal
			button={classes.button}
			modal={classes.modal}
			paper={classes.paper}
			avatar={classes.avatar}
			form={classes.form}
			submit={classes.submit}
		/>
	);
}
