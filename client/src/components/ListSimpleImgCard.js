import * as React from 'react';
import PropTypes from 'prop-types';
import SimpleImageCard from './SimpleImageCard';
import Box from '@material-ui/core/Box';
// import { ThemeProvider, createTheme } from '@material-ui/material/styles';

// const theme = createTheme({
//     components: {
//         MuiBox: {
//             styleOverrides: {
//                 root: {
//                     display: 'flex'
//                 }
//             }
//         }
//     }
// });

export default function ListSimpleImgCard(props) {
    const items = props?.items || [];
    return (
        // <ThemeProvider theme={theme}>
            <Box
                display='flex'
                overflow='auto'
                padding='2px'
            >
                {items.map(item => <SimpleImageCard
                    key={item.id}
                    image={item.image}
                    name={item.name}
                    onClick={() => props.onClick(item.id)}
                />)}
            </Box>
        // </ThemeProvider>
    );
}

ListSimpleImgCard.propTypes = {
    items: PropTypes.array
};
