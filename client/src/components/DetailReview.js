import React, {Component} from 'react';
import {connect} from 'react-redux';

import {deleteItem} from '../actions/itemActions';

class DetailReview extends Component {
    constructor(){
        super();

    }
    render() {
        return (
            <div>this.props.id</div>
        )
    }
};

export default DetailReview;