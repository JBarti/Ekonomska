import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import FileDownload from '@material-ui/icons/FileDownload'
import List from '@material-ui/core/List'
import Collapse from '@material-ui/core/Collapse'
import ListItemText from '@material-ui/core/ListItemText'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';



const styles = theme => ({
    sidebarItemText: {
        letterSpacing: 0.2,
    },
})

class Folder extends Component {

    constructor(props) {
        super(props)

        console.log(this.props.children)
    }

    state = { open: false }

    open = () => {
        this.setState({ open: !this.state.open })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <ListItem button onClick={this.open}>
                    <ListItemIcon>
                        <FileDownload />
                    </ListItemIcon>
                    <ListItemText
                        inset
                        primary={this.props.primary}
                        secondary={this.props.secondary}
                        className={classes.sidebarItemText} />
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

Folder.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Folder);