import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import FileDownload from '@material-ui/icons/FileDownload'
import List from '@material-ui/core/List'
import Collapse from '@material-ui/core/Collapse'
import ListItemText from '@material-ui/core/ListItemText'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Folder from '@material-ui/icons/Folder'
import FolderOpen from '@material-ui/icons/FolderOpen'



const styles = theme => ({
    listItemText: {
        letterSpacing: 0.82,
        color: 'blue'
    },
    expanded: {
        boxSizing: 'border-box',
        color: theme.palette.secondary.main,

    },
    notExpanded: {

    }
})

class ListFolder extends Component {

    state = { open: false }

    open = () => {
        this.setState({ open: !this.state.open })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <ListItem button onClick={this.open} className={this.state.open ? classes.expanded : classes.notExpanded}>
                    <ListItemIcon color='secondary'>
                        {this.state.open ? <FolderOpen /> : <Folder />}
                    </ListItemIcon>
                    <ListItemText
                        inset
                        primaryTypographyProps={{ color: this.state.open ? 'secondary' : 'default' }}
                        primary={this.props.primary}
                        secondary={this.props.secondary}
                        className={classes.listItemText} />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem >
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List>
                        {this.props.children}
                    </List>
                </Collapse>
            </div>
        );
    }
}

ListFolder.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string,
};

export default withStyles(styles)(ListFolder);