import React, { Component, Fragment } from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Bitak
                    </Typography>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/register">
                        <Button color="inherit" >Register</Button>
                    </Link>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }}to="/login">
                        <Button color="inherit" >Log In</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

// export default function Pricing() {
//     return (
//         <Fragment>
//             <CssBaseline />
//             <AppBar
//                 position="static"
//                 color="default"
//                 elevation={0}
//             >
//                 <Toolbar>
//                     <Typography
//                         variant="h6"
//                         color="inherit"
//                         noWrap
//                     >
//                         Bitak
//                     </Typography>
//                     <Link to="/register">
//                         <Button variant="outlined">Register</Button>
//                     </Link>
//                     <Link to="/register">
//                         <Button variant="outlined">Log In</Button>
//                     </Link>
//                 </Toolbar>
//             </AppBar>
//         </Fragment>
//     );
// }
