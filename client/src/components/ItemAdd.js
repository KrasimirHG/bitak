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
import PublishIcon from "@material-ui/icons/Publish";
import { makeStyles } from "@material-ui/core/styles";

import { addItem } from "../actions/itemActions";

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
		backgroundColor: "darkgrey",
		fontSize: "1.5rem",
		margin: theme.spacing(3, 3),
	},
	paper: {
		backgroundColor: 'white',
		marginTop: theme.spacing(8),
		padding: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

class ItAdd extends Component {
	constructor(props) {
		super();
		this.state = {
			name: '',
			description: '',
			price: '',
			img: null,
		};
	}
	handleModal = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onImageChange = (e) => {
		this.setState({ img: e.target.files });
		console.log(e.target.files);
	};

	onSubmit = (e) => {
		e.preventDefault();
		const { name, description, img, price } = this.state;
		this.props.addItem(name, description, img, price, this.props.userId);
	};

	render() {
		return (
			<Box>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<div className={this.props.paper}>
						<Avatar className={this.props.avatar}>
							<PublishIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Upload Item
						</Typography>
						<form
							className={this.props.form}
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
								<Grid item xs={12} sm={6}>
									<TextField
										autoComplete="price"
										name="price"
										variant="outlined"
										required
										fullWidth
										id="price"
										label="price"
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
										// className={classes.input}
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
								className={this.props.submit}
							>
								Upload
							</Button>
						</form>
					</div>
				</Container>
			</Box>
		);
	}
}

function ItemAdd(props) {
	const classes = useStyles();

	if (props.shouldRedirect) return <Navigate replace to='/'/>;
	return (
		<ItAdd
			button={classes.button}
			modal={classes.modal}
			paper={classes.paper}
			avatar={classes.avatar}
			form={classes.form}
			submit={classes.submit}
			addItem={props.addItem}
		/>
	);
};

const mapStateToProps = state => {
	return {
		items: state.items,
		shouldRedirect: state.shouldRedirect,
		userId: state.user?.user?._id
	}
}

export default connect(mapStateToProps, { addItem, ItAdd })(ItemAdd);
