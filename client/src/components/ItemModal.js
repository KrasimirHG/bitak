import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import PublishIcon from "@material-ui/icons/Publish";
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
		marginTop: theme.spacing(8),
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

class ItModal extends Component {
	constructor() {
		super();
		this.state = {
			isOpen: false,
			name: "",
			description: "",
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
		console.log(this.state.images);
		const formData = new FormData();

		formData.append("itemName", this.state.name);
		formData.append("itemDesc", this.state.description);
		const files = this.state.img;
		for (let i = 0; i < files.length; i++) {
			formData.append("pictures", files[i]);
		}
		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};
		axios
			.post("http://localhost:5000/api/items", formData, config)
			// .then((response) => {
			// 	alert("The file is successfully uploaded");
			// })
			.catch((error) => {});
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
					AddItem
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
				</Modal>
			</Box>
		);
	}
}

export default function ItemModal() {
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
