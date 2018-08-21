import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    root: {
        width: 250,
    },

    drawerPaper: {
        width: '100%',
        position: 'relative',
        border: 0,
        marginTop: 65
    },
    toolbar: theme.mixins.toolbar
})

class Sidebar extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Drawer
                anchor='left'
                variant='permanent'
                className={classes.root}
                classes={{
                    paper: classes.drawerPaper,
                }}>
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
