import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import PropTypes from 'prop-types';
import style from './SimpleImageCard.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    components: {
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: 0
                }
            }
        }
    }
});

export default function SimpleImageCard(props) {
    const {image, name} = props;
    return (
        <ThemeProvider theme={theme}>
            <Card sx={{ maxWidth: 145 }} style={style.cardStyle}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="110"
                        image={image}
                        alt={name}
                    />
                    <CardContent>
                        <Typography align="center" variant="h5" component="div">
                            {name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </ThemeProvider>
    );
}
SimpleImageCard.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string
};
