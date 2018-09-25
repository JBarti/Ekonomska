import React, { Component } from 'react';
import './sidebar.css'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar'
import QuestionAnswer from '@material-ui/icons/QuestionAnswer'
import HelpOutline from '@material-ui/icons/HelpOutline'
import Settings from '@material-ui/icons/Settings'

const styles = theme => ({
    root: {
        width: 250,
        position: 'relative',
        zIndex: 900,
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

    toolbar: theme.mixins.toolbar,

    helpTab: {
        color: 'lightslategray',
        fontSize: '0.9em',
        position: 'absolute',
        bottom: 0,
        zIndex: 2,
    }
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
                    <div className={classes.helpTab}>
                        <p className="htxt"><HelpOutline className="ho" /> Pomoć </p>
                        <p className="htxt"><QuestionAnswer className="ho" /> Često postavljena pitanja </p>
                        <p className="htxt"> <Settings className="ho" /> Postavke</p>
                    </div>
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
