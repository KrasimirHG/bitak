import React, { Component, Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import LoginModal from "./auth/LoginModal";

const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	toolbar: {
		flexWrap: "wrap",
		backgroundColor: "#ffb74d",
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

export default function Pricing() {
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
					<Button
						href="#"
						variant="outlined"
						className={classes.link}
					>
						Register
					</Button>
					<LoginModal />
				</Toolbar>
			</AppBar>
		</Fragment>
	);
}
