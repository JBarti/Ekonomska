import React, { Component } from 'react';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'



const styles = theme => ({
    root: {
        backgroundColor: '#eeeeee',
        width: '100%',
        height: '100vh',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    content: {
        height: '100%',
        alignItems: 'center',
    },
})


class External extends Component {

    expandContent = () => {
        this.setState({ fullscreen: !this.state.fullscreen })
    }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <iframe
                    src={this.props.url}
                    height='100%' width='100%' />
            </div>

        )
    }

}

export default withStyles(styles)(External);
