import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import FileDownload from '@material-ui/icons/FileDownload'
import Typography from '@material-ui/core/Typography'


const styles = theme => ({
    sidebarItemText: {
        letterSpacing: 0.2,
    },
    sidebarItemTabbed: {
        paddingLeft: 40
    }
})

class SidebarItem extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.classes)

    }
    render() {
        const { classes } = this.props;
        return (
            <ListItem button className={this.props.tabbed ? classes.sidebarItemTabbed : classes.sidebarItem}>
                <ListItemIcon>
                    <FileDownload />
                </ListItemIcon>
                <ListItemText
                    inset
                    primary={this.props.primary}
                    secondary={this.props.secondary}
                    className={classes.sidebarItemText} />
            </ListItem >
        );
    }
}

SidebarItem.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.string
};

export default withStyles(styles)(SidebarItem);