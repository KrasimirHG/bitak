import React, {Component} from 'react';
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Image from "material-ui-image";
import ImageGallery from 'react-image-gallery';

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
    
    render() {
        let {filename: pics, name, description} = this.props.item;
        if(!pics){
            return <h2>Please, select a product</h2>
         }

           const images = this.props.item.filename.map(img => ({original: img,
                thumbnail: img, originalWidth: '600px', thumbnailWidth: '150px'}));
        
        return (
            <div>
        <h2>{name}</h2>
        <ImageGallery
           items={images}
           />;
        <p>{description}</p>
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