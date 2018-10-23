import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        position: 'relative',
        width: '100%',
        height: '100%',
        maxHeight: '50%',
        minHeight: '50%',
        display: 'flex',
        boxSizing: 'border-box',
        padding: '2vw',
        '&:nth-child(2n)': {
            paddingTop: 0
        },
        flexGrow: 0,
        flexShring: 0
    },
})

class Row extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                {this.props.children}
            </div>
        );
    }
}

Row.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default withStyles(styles)(Row);
