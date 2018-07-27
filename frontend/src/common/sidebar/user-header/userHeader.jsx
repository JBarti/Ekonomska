import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import FileDownload from '@material-ui/icons/FileDownload'
import List from '@material-ui/core/List'
import Collapse from '@material-ui/core/Collapse'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'


const styles = theme => ({
    avatar: {
        width: 60,
        height: 60,
        backgroundColor: theme.secondary
    },
    listItemText: {
        marginTop: 10
    },
    root: {
        display: 'flexbox',
        flexDirection: 'column',
        backgroundColor: theme.palette.secondary.main,
        marginTop: -16,
        paddingTop: 20,
        paddingBottom: 20
    },
})

class UserHeader extends Component {

    render() {
        const { classes } = this.props;
        return (
            <ListItem className={classes.root} >
                <Avatar className={classes.avatar}>{this.props.avatarLetter}</Avatar>
                <ListItemText
                    inset
                    primary={this.props.username}
                    secondary={this.props.status}
                    className={classes.listItemText} />
            </ListItem >
        );
    }
}

UserHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired,
    avatarLetter: PropTypes.string.isRequired,
    status: PropTypes.string,
};

export default withStyles(styles)(UserHeader);