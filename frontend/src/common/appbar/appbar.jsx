import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar';


const styles = theme => ({
    text: {
        letterSpacing: 0.82,
        alignText: 'left'
    },
    appBar: {
        position: 'fixed',
        display: 'inline-block',
        width: `calc(100% - 250px)`,
        paddingLeft: 20,
        height: 65
    },
})

class Appbar extends Component {
    render() {
        const { classes } = this.props;
        return (
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Typography variant="title" color="inherit" className={classes.text}>
                        Financijska Pismenost
                    </Typography>
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