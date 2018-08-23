import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Icon, Button, Chip, Avatar } from '@material-ui/core';
import Appbar from '../../../common/appbar/appbar'
import IconButton from '@material-ui/core/IconButton'
import Fullscreen from '@material-ui/icons/Fullscreen'
import MenuIcon from '@material-ui/icons/Menu'

const styles = theme => ({
    avatar: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.common.white,
        marginLeft: 16,

    },
    username: {
        color: theme.palette.common.white,
        textAlign: 'right',
        marginLeft: 16
    },
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'right',
        padding: 8,
        boxSizing: 'border-box',
        width: '100%'
    }
})


class UcenikAppBar extends Component {

    render() {
        const { classes } = this.props
        return (
            <Appbar
                beforeTitle={<IconButton style={{ color: 'white' }}
                    onClick={this.props.onMenu}>
                    <MenuIcon />
                </IconButton>}>
                <div className={classes.root}>
                    <Avatar className={classes.avatar}>3.D</Avatar>
                    <div>
                        <Typography className={classes.username} variant='subheading'>Mate Mišo</Typography>
                    </div>
                </div>
            </Appbar>
        )
    }

}

export default withStyles(styles)(UcenikAppBar);
