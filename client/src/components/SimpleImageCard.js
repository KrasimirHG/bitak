import * as React from 'react';
import Card from '@material-ui/material/Card';
import CardContent from '@material-ui/material/CardContent';
import CardMedia from '@material-ui/material/CardMedia';
import Typography from '@material-ui/material/Typography';
import { CardActionArea } from '@material-ui/material';
import PropTypes from 'prop-types';
import { ThemeProvider, createTheme } from '@material-ui/material/styles';

const theme = createTheme({
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    minWidth: 145,
                    marginRight: 2
                }
            }
        },
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
    const handleClick = () => {
        return props?.onClick ? props.onClick() : () => {};
    };

    const {image, name} = props;
    return (
        <ThemeProvider theme={theme}>
            <Card sx={{ maxWidth: 145 }} onClick={() => handleClick()}>
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
    name: PropTypes.string,
    onClick: PropTypes.func
};
