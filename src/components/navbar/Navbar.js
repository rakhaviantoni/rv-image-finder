import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Navbar = () =>
    <AppBar position="static" color="primary">
        <Toolbar>
            <Typography variant="title" color="inherit">
              RV Image Finder
            </Typography>
        </Toolbar>
    </AppBar>;

export default Navbar;