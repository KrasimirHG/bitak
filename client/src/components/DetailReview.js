import React, {Component} from 'react';
import {connect} from 'react-redux';
import Carousel from 'react-material-ui-carousel';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Image from "material-ui-image";

import {deleteItem} from '../actions/itemActions';

function Item(props)
{
    return (
        <Paper>
            <Image src={props.pic} />
            <h2>{props.picName}</h2>
            <p>{props.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}

class DetailReview extends Component {
    constructor(){
        super();
    }

    // pics = this.props.item.filename;
    // picName = this.props.item.name;
    
    render() {
        let {filename: pics, name: picName, description} = this.props.item;
        if(!pics){
           return <h2>Please, select a product</h2>
        }

        return (
            <div style={{maxWidth: '70vw', maxHeight: '60vh'}}>
            <Carousel 
            indicatorIconButtonProps={{
                style: {
                    padding: '10px',    // 1
                    color: 'blue'       // 3
                }
            }}
            indicatorContainerProps={{
                style: {
                    marginTop: '50px', // 5
                    textAlign: 'right' // 4
                }
        
            }}
            >
            {
                pics.map( (pic, i) => <Item key={picName} pic={pic} description={description} /> )
            }
        </Carousel>
        </div>
        )
    }
};

const mapStateToProps = (state) =>{
    return {
        item: state.selectedItem
    }
}

export default connect(mapStateToProps)(DetailReview);