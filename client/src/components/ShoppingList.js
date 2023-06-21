import React, { useEffect } from 'react';
import {connect, useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
// import {getItems, deleteItem, setRedirect} from '../actions/itemActions';
import ListSimpleImgCard from './ListSimpleImgCard';
import ReviewCard from './ReviewCard';
import {
    getItemsAsync, addItemAsync, deleteItemAsync, setRedirect, getErrorsAsync, clearErrors, selectApp
} from '../appSlice';

function ShoppingList(props) {
    // const {getItemsAsync, deleteItemAsync, setRedirect} = props;
    const dispatch = useDispatch();
    const items = useSelector(selectApp).items;

    useEffect(() => {
        getItemsAsync();
        setRedirect(false);
    }, []);

    function handleClick(id) {
        deleteItemAsync(id);
        console.log('PROD_ID IS: ', id);
    }

    function onHandleClick(id) {
        console.log('PROD_ID IS: ', id);
    }

    const simpleProducts = items.map(product => ({
        id: product._id,
        image: product.filename[0],
        name: product.name
    }));
    console.log(items);
    return (
        <div style={{padding: '10px'}}>
            <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/addItem">
                <Button>
                    AddItem
                </Button>
            </Link>
            <Grid container direction="row" spacing={2} justifyContent="flex-start">
                {items.map((prod) => (
                    <Grid item xs={12} sm={3} key={prod._id}>
                        <ReviewCard
                            pic={prod.filename[0]}
                            name={prod.name}
                            description={prod.description}
                            id={prod._id}
                            onClick={() => dispatch(handleClick(prod._id))}
                        />
                    </Grid>
                ))}
            </Grid>
            <ListSimpleImgCard items={simpleProducts} onClick={(id) => dispatch(onHandleClick(id))}/>
        </div>
    );
};

ShoppingList.propTypes = {
    getItemsAsync: PropTypes.func,
    deleteItemAsync: PropTypes.func,
    setRedirect: PropTypes.func,
    items: PropTypes.array
};

// const mapStateToProps = state => {
//     return {
//         items: state.items
//     };
// };

// export default connect(mapStateToProps, ({getItemsAsync, addItemAsync, deleteItemAsync, setRedirect, getErrorsAsync, clearErrors}))(ShoppingList);
export default ShoppingList;
