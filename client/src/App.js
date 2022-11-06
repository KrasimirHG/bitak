import React from 'react';
import AppNav from './components/AppNav';
import ShoppingList from './components/ShoppingList';
import Box from '@mui/material/Box';

function App() {
    return (
        <Box>
            <AppNav />
            <ShoppingList />
        </Box>
    );
}

export default App;
