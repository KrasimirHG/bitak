import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Image from "material-ui-image";
import ImageGallery from 'react-image-gallery';

import { deleteItem } from '../actions/itemActions';

// function Item(props)
// {
//     return (
//         <Paper>
//             <Image src={props.pic} />
//             <h2>{props.picName}</h2>
//             <p>{props.description}</p>

//             <Box className="CheckButton">
//                 Check it out!
//             </Box>
//         </Paper>
//     )
// }

class DetailReview extends Component {
    constructor() {
        super();
    }

    render() {
        let { filename: pics, name, description } = this.props.item;
        if (!pics) {
            return <h2>Please, select a product</h2>
        }

        const images = this.props.item.filename.map(img => ({
            original: img,
            thumbnail: img, originalWidth: '600px', thumbnailWidth: '150px'
        }));

        return (
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Container>
                        <h2>{name}</h2>
                        <ImageGallery
                            items={images}
                        />
                        <p>{description}</p>
                    </Container>
                </Grid>
                <Grid item xs={4}>
                    <Container>
                        <h3>User Section</h3>
                    </Container>
                </Grid>
            </Grid>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        item: state.selectedItem
    }
}

export default connect(mapStateToProps)(DetailReview);