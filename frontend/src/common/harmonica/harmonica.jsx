import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import HarmonicaTab from './harmonica-tab/harmonicaTab'
import List from '@material-ui/core/List'

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: -9
    },
})

class Harmonica extends Component {
    render() {
        const { classes } = this.props;
        return (
            <List className={classes.root}>
                {this.props.children}
            </List>
        )
    }
}

Harmonica.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default withStyles(styles)(Harmonica);
