import React, {Component} from 'react';
import {connect} from 'react-redux';
import ImageGallery from 'react-image-gallery';
import PropTypes from 'prop-types';

// import {deleteItem} from '../actions/itemActions';

class DetailReview extends Component {
    render() {
        const {filename: pics, name, description} = this.props.item;
        if (!pics) {
            return <h2>Please, select a product</h2>;
        }

        const images = this.props.item.filename.map(img => ({
            original: img,
            thumbnail: img,
            originalWidth: '600px',
            thumbnailWidth: '150px'
        }));

        return (
            <div>
                <h2>{name}</h2>
                <ImageGallery
                    items={images}
                />;
                <p>{description}</p>
            </div>
        );
    }
};

DetailReview.propTypes = {
    item: PropTypes.shape({
        description: PropTypes.string,
        name: PropTypes.string,
        filename: PropTypes.string
    })
};

const mapStateToProps = (state) => {
    return {
        item: state.selectedItem
    };
};

export default connect(mapStateToProps)(DetailReview);
