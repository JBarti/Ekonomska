import React, { Component } from 'react';
import './sidebar.css'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer'
import HelpOutline from '@material-ui/icons/HelpOutline'
import Settings from '@material-ui/icons/Settings'


const styles = theme => ({
    root: {
        width: 250,
        position: 'relative'
    },

    drawerPaper: {
        width: '100%',
        position: 'relative',
        border: 0,
        marginTop: 65
    },

    toolbar: theme.mixins.toolbar,

    helpTab: {
        color: 'lightslategray',
        fontSize: '0.9em',
        position: 'absolute',
        bottom: 65
    }
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
