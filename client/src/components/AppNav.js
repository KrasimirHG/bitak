import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import LoginModal from "./auth/LoginModal";
import RegisterModal from "./auth/RegisterModal";

const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	toolbar: {
		flexWrap: "wrap",
		backgroundColor: "lightgrey",
	},
	toolbarTitle: {
		flexGrow: 1,
		color: "navy",
	},
	link: {
		margin: theme.spacing(1, 1.5),
		color: "#aaffcc",
		border: "1px solid blue",
		backgroundColor: "darkgrey",
	},
}));

function NavBar(props) {
	const classes = useStyles();

	return (
		<Fragment>
			<CssBaseline />
			<AppBar
				position="static"
				color="default"
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar className={classes.toolbar}>
					<Typography
						variant="h6"
						color="inherit"
						noWrap
						className={classes.toolbarTitle}
					>
						Bitak
					</Typography>
					{ props.user?.token ? 
					<h4>LogOut</h4> : <>
					<RegisterModal />
					<LoginModal />
					</> }	
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

export default connect(mapStateToProps)(NavBar);
