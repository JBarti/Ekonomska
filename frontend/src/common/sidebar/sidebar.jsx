import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    root: {
        position: 'absolute',
        display: 'inline',
        width: 240,
    },
    drawerList: {
        letterSpacing: 0.86,
        width: 240,
    }
})

class Sidebar extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Drawer
                anchor='left'
                variant='permanent'
                className={classes.root}>
                <List className={classes.drawerList}>
                    <List className={classes.drawerList}>
                        {this.props.children}
                    </List>
                </List>
            </Drawer >
        );
    }
}

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.array
};

export default withStyles(styles)(Sidebar);
