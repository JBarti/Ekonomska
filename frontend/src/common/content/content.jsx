import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Row from './row/row'
import { Button } from '@material-ui/core';
import ContentCard from '../content-card/contentCard'


const styles = theme => ({
    root: {
        display: 'inline-block',
        position: 'absolute',
        width: `calc(100% - 250px)`,
        height: 'calc(100% - 65px)',
        display: 'flex',
        flexDirection: 'column',
        bottom: 0,
        right: 0,
        overflowY: 'auto',
    },
})

class Content extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                {this.props.children}
            </div>
        );
    }
}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default withStyles(styles)(Content);
