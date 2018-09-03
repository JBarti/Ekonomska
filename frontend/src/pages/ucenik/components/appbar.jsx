import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Icon, Button, Chip, Avatar } from '@material-ui/core';
import Appbar from '../../../common/appbar/appbar'

const styles = theme => ({
    avatar: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.common.white,
        marginLeft: 16,

    },
    username: {
        color: theme.palette.common.white,
        textAlign: 'right'
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
            <Appbar>
                <div className={classes.root}>
                    <div>
                        <Typography className={classes.username} variant='subheading'>Mate Mišo</Typography>
                        <Typography className={classes.username} variant='caption'>3.D</Typography>
                    </div>
                    <Avatar className={classes.avatar}>3.D</Avatar>
                </div>
            </Appbar>
        )
    }

}

export default withStyles(styles)(UcenikAppBar);
