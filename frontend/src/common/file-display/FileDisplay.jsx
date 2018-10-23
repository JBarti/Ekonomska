import React, { Component } from 'react';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Fullscreen from '@material-ui/icons/Fullscreen'


const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        overflowY: 'hidden'
    }
})


class FileDisplay extends Component {
    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <iframe
                    src={this.props.src}
                    height='100%' width='100%' />
            </div>
        )
    }

}

export default withStyles(styles)(FileDisplay);
