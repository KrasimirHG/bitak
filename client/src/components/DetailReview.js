import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Image from 'material-ui-image';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import styles from './style.css';

import { deleteItem } from '../actions/itemActions';

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

    render() {
        let { filename: pics, name, description } = this.props.item;
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

        return (
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Container>
                        <h1>{name}</h1>
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
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d47706.780655602306!2d25.050249135824522!3d41.64118200549584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbg!4v1576834988537!5m2!1sen!2sbg"
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
                <h2>From the same customer: </h2>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        item: state.selectedItem,
        user: state.user?.user
    };
};

export default connect(mapStateToProps)(DetailReview);
