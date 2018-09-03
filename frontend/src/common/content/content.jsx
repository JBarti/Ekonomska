import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Row from './row/row'
import { Button } from '@material-ui/core';
import ContentCard from '../content-card/contentCard'


const styles = theme => ({
    root: {
        display: 'inline-block',
        marginTop: 65,
        position: 'absolute',
        bottom: 0,
        right: 0,
        height: 'calc(100% - 65px)',
        display: 'flex',
        flexDirection: 'column',
        right: 0,
        overflowY: 'auto',
        transitionDuration: '225ms'
    },
})

class Content extends Component {
    render() {
        const { classes } = this.props;


        return (
            <div
                style={this.props.expanded ? { width: '100%' } : { width: `calc(100% - 250px)` }}
                className={classes.root} >
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
