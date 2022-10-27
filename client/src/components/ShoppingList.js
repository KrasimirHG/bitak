import React, { Component } from "react";
import {connect} from 'react-redux';

import ItemModal from "./ItemModal";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import DeleteIcon from "@material-ui/icons/Delete";
import GridList from "@material-ui/core/GridList";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";

import {getItems, deleteItem} from '../actions/itemActions';
// import store from '../store';

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		overflow: "hidden",
		backgroundColor: theme.palette.background.paper,
	},
	cardRoot: {
		maxWidth: 345,
	},
	media: {
		height: 0,
		paddingTop: "56.25%", // 16:9
	},

	avatar: {
		backgroundColor: red[500],
	},
	gridList: {
		width: 500,
		height: 450,
	},
}));

function ReviewCard(props) {
	const classes = useStyles();

	// const handleClick = () => {
	// 	console.log('Opaaaa', props.id)
	// }

	function handleDelete() {
		props.onClick(props.id);
	}

	return (
		<Card className={classes.cardRoot}>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						R
					</Avatar>
				}
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title={props.name}
				subheader={props.date}
			/>
			<CardMedia
				className={classes.media}
				image={props.pic}
				title={props.name}
			/>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{props.description}
					This impressive paella is a perfect party dish and a fun
					meal to cook together with your guests. Add 1 cup of frozen
					peas along with the mussels, if you like.
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label="delete">
					<DeleteIcon onClick={handleDelete}/>
				</IconButton>
			</CardActions>
		</Card>
	);
}

function ItemGridList(props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<GridList cols={3}>
				<ReviewCard
					pic={props.pic}
					name={props.name}
					description={props.description}
				/>
			</GridList>
		</div>
	);
}

class ShoppingList extends Component {
	constructor(props){
		super();
		this.state = {
			stoka: [],
		};
	}
	
	componentDidMount() {
		this.props.getItems();
	}

	handleClick(id) {
        this.props.deleteItem(id);
		console.log('PROD_ID IS: ', id)
	}

	render() {
		const products = this.props.items;
		console.log(products);
		return (
			<div style={{padding: '10px'}}>
				<ItemModal />
				<Grid container direction="row" spacing={2} justifyContent="flex-end">
					{products.map((prod) => (
						<Grid item xs={12} sm={3}>
							<ReviewCard
								pic={prod.filename[0]}
								name={prod.name}
								description={prod.description}
								id={prod._id}
								onClick={() => this.handleClick(prod._id)}
							/>
						</Grid>
					))}
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		items: state.items
	}
}

export default connect(mapStateToProps, {getItems, deleteItem})(ShoppingList);
