import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import axios from 'axios';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
// import GridList from "@mui/material/GridList";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';

import {getItems, deleteItem} from '../actions/itemActions';
import SimpleImageCard from './SimpleImageCard';
import ListSimpleImgCard from './ListSimpleImgCard';
// import store from '../store';

function ReviewCard(props) {
    function handleDelete() {
        props.onClick(props.id);
    }

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                        {props.name[0]}
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
                component='img'
                height='210'
                image={props.pic}
                title={props.name}
                alt={props.name}
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
};

ReviewCard.propTypes = {
    onClick: PropTypes.func,
    id: PropTypes.string,
    name: PropTypes.string,
    date: PropTypes.string,
    pic: PropTypes.string,
    description: PropTypes.string
};

class ShoppingList extends Component {
    constructor(props) {
        super();
        this.state = {
            stoka: []
        };
    }

    componentDidMount() {
        this.props.getItems();
    }

    handleClick(id) {
        this.props.deleteItem(id);
        console.log('PROD_ID IS: ', id);
    }

    onHandleClick(id) {
        console.log('PROD_ID IS: ', id);
    }

    render() {
        const products = this.props.items;
        const simpleProducts = products.map(product => ({
            id: product._id,
            image: product.filename[0],
            name: product.name
        }));
        console.log(products);
        return (
            <div style={{padding: '10px'}}>
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/addItem">
                    <Button>
                        AddItem
                    </Button>
                </Link>
                <Grid container direction="row" spacing={2} justifyContent="flex-start">
                    {products.map((prod) => (
                        <Grid item xs={12} sm={3} key={prod._id}>
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
                {/* {products[0] && <SimpleImageCard image={products[0].filename[0]} name={'Праскови'} />} */}
                <ListSimpleImgCard items={simpleProducts} onClick={(id) => this.onHandleClick(id)}/>

            </div>
        );
    }
};

ShoppingList.propTypes = {
    getItems: PropTypes.func,
    deleteItem: PropTypes.func,
    items: PropTypes.array
};

const mapStateToProps = state => {
    return {
        items: state.items
    };
};

export default connect(mapStateToProps, {getItems, deleteItem})(ShoppingList);
