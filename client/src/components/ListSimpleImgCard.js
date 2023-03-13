import * as React from 'react';
import PropTypes from 'prop-types';
import SimpleImageCard from './SimpleImageCard';
import Box from '@material-ui/material/Box';
import { ThemeProvider, createTheme } from '@material-ui/material/styles';

const theme = createTheme({
    components: {
        MuiBox: {
            styleOverrides: {
                root: {
                    display: 'flex',
                    border: '2px solid red'
                }
            }
        }
    }
});

export default function ListSimpleImgCard(props) {
    const items = props?.items || [];
    return (
        <ThemeProvider theme={theme}>
            <Box
                display='flex'
                overflow='auto'
                padding='2px'
            >
                {items.map(item => <SimpleImageCard
                    key={item.id}
                    image={item.image}
                    name={item.name}
                    onClick={() => console.log('Id is: ', item.id)}
                />)}
            </Box>
        </ThemeProvider>
    );
}

ListSimpleImgCard.propTypes = {
    items: PropTypes.array
};
