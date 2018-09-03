import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar'


const styles = theme => ({
    root: {
        width: 250,
    },

    drawerPaper: {
        position: 'relative',
        border: 0,
    },
    appbar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        height: 65,
        width: '100%',
        position: 'relative',
        backgroundColor: theme.palette.primary.dark
    },
    toolbar: theme.mixins.toolbar
})

class Sidebar extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Drawer
                anchor='left'
                variant='persistent'
                onAnimationEnd={this.changeVisibility}
                open={this.props.open}
                className={classes.root}
                classes={{
                    paper: classes.drawerPaper,
                }}>
                <AppBar className={classes.appbar}>
                    {this.props.appbar}
                </AppBar>
                <div className={classes.toolbar}>
                    <List className={classes.drawerList}>
                        {this.props.children}
                    </List>
                </div>
            </Drawer >
        );
    }
}

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default withStyles(styles)(Sidebar);
