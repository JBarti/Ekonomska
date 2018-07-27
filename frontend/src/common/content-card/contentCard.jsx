import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ListButton from '../list-button/listButton'
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider';


const styles = theme => ({
    root: {
        flexGrow: 0,
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        marginRight: '2vw',
        '&:last-child': {
            marginRight: 0
        },
        overflowY: 'auto',
    },
    subheader: {
        textAlign: 'left',
        fontSize: 16,
        borderBottomColor: 'rgba(0, 0, 0, 0.12)',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        backgroundColor: '#fff'
    }
})

class ContentCard extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.root} >
                <List subheader={<ListSubheader component="div" className={classes.subheader}>{this.props.cardName}</ListSubheader>}>
                    {this.props.children}
                </List>
            </Card>
        );
    }
}

ContentCard.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default withStyles(styles)(ContentCard);
