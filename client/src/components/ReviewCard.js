import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ReviewCard(props) {
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
