import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar';
import { Menu } from '@material-ui/core';


const styles = theme => ({
    text: {
        letterSpacing: 0.82,
        textAlign: 'left',
        width: '100%',
        marginLeft: 16
    },
    root: {
        zIndex: theme.zIndex.drawer + 1,
        position: 'fixed',
        width: `100%`,
        height: 65,
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
    },
})

class Appbar extends Component {
    render() {
        const { classes } = this.props;
        return (
            <AppBar className={classes.root}>
                <Toolbar className={classes.toolbar}>
                    {this.props.beforeTitle}
                    <Typography variant="title" color="inherit" className={classes.text}>
                        Financijska Pismenost
                    </Typography>
                    {this.props.children}
                </Toolbar>
            </AppBar>
        );
    }
}

Appbar.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default withStyles(styles)(Appbar);