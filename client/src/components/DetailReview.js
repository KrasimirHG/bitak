import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Image from 'material-ui-image';
import ListSimpleImgCard from './ListSimpleImgCard';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import styles from './style.css';

import { getItemsByUser, deleteItem, selectItem } from '../actions/itemActions';

class DetailReview extends Component {
    constructor() {
        super();
        this.state = {
            lat: '',
            long: '',
            geoError: ''
        };
    }

    componentDidMount() {
        this.getLocation();
        this.props.getItemsByUser(this.props.item.createdBy);
    }

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            this.setState({
                geoError: 'Geolocation is not supported by this browser.'
            });
        }
    };

    showPosition = (position) => {
        this.setState({
            lat: position.coords.latitude,
            long: position.coords.longitude
        });
    };

    handleClick = (id) => {
        const item = this.props.items.find((item) => item._id === id);
        item && this.props.selectItem(item);
    };

    render() {
        let { filename: pics, name, description, price } = this.props.item;
        if (!pics) {
            return <h2>Please, select a product</h2>;
        }

        const images = this.props.item.filename.map((img) => ({
            original: img,
            thumbnail: img,
            originalWidth: '600px',
            thumbnailWidth: '150px'
        }));

        const { firstName, lastName, email, phoneNumber } = this.props.user;
        const simpleProducts = this.props.itemsByUser.map((product) => ({
            id: product._id,
            image: product.filename[0],
            name: product.name
        }));

        return (
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Container>
                        <h1>{name} {price}</h1>
                        <ImageGallery items={images} />
                        <p>{description}</p>
                    </Container>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <h3>Published By:</h3>
                        <h4>
                            {firstName} {lastName}
                        </h4>
                        <h4>Email: {email}</h4>
                        <h4>Phone: {phoneNumber}</h4>
                        <h4>Location: </h4>
                        <div className={styles.googleMap}>
                            <iframe
                                title="map"
                                src={`https://www.google.com/maps?q=${this.state.lat},${this.state.long}&z=15&output=embed`}
                                allowfullScreen
                                width={350}
                                height={300}
                            ></iframe>
                        </div>
                        {this.state.geoError ? (
                            <h4>{this.setState.geoError}</h4>
                        ) : (
                            <div>
                                <h4>Latitude: {this.state.lat}</h4>
                                <h4>Longtitude: {this.state.long}</h4>
                            </div>
                        )}
                    </Container>
                </Grid>
                <Box display={'flex'} flexDirection={'column'}>
                    <h2>From the same customer: </h2>
                    <ListSimpleImgCard
                        items={simpleProducts}
                        onClick={(id) => this.handleClick(id)}
                    />
                </Box>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.items,
        item: state.selectedItem,
        user: state.user?.user,
        itemsByUser: state.itemsByUser
    };
};

export default connect(mapStateToProps, {
    getItemsByUser,
    deleteItem,
    selectItem
})(DetailReview);
