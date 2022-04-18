import { Component } from 'react';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';

class NavBarComponent extends Component {
  render() {
    return (
      <React.Fragment>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              SGI-Webapp
            </Typography>
            <Button href="/home" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Accueil
            </Button>
            <Button href="/home/formation" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Formation
            </Button>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

export default NavBarComponent;