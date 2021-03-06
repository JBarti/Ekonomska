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
import ListButton from '../list-button/listButton'

const styles = theme => ({
    root: {
        width: 250,
        position: 'relative',
        zIndex: 900,
    },

    drawerPaper: {
        position: 'relative',
        border: 0,
        backgroundColor: '#34495E',
        overflowX: 'hidden',
        backgroundColor: 'white',
        webkitBoxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
        mozBoxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
        boxShadow: '0px 0px 45px -19px rgba(0,0,0,0.75)'
    },
    appbar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        height: 65,
        width: '100%',
        position: 'relative',
        background: 'linear-gradient(270deg, #C33764 0%, #252E73 100%)'
    },

    toolbar: theme.mixins.toolbar,

    helpTab: {
        color: 'lightslategray',
        fontSize: '0.9em',
        position: 'absolute',
        bottom: 0,
        zIndex: 2,
        width: '100%',
        marginBottom: 16
    },
    serviceButton: {
        width: '100%',
    },
    serviceButtonIcon: {

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
                        <ListButton primary='Pomoć' className={classes.serviceButton} icon={<HelpOutline className={classes.serviceButtonIcon} />} />
                        <ListButton primary='FAQ' icon={<QuestionAnswer className={classes.serviceButtonIcon} />} />
                        <ListButton primary='Postavke' icon={<Settings className={classes.serviceButtonIcon} />} />

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
