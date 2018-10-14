import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ContentCard from '../../../common/content-card/contentCard'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    root: {
        overflow: 'hidden',
        width: '100%',
    }
})

class stdlistCard extends Component {
    render() {
        const { classes } = this.props
        return (    
            <ContentCard cardName='Moji razredi' className={classes.root}>
               <List component="nav"className={classes.root}>
                     <ListItem button>
                       <ListItemText primary="4.D" />
                     </ListItem>
                     <Divider />
                     <ListItem button>
                       <ListItemText primary="4.F" />
                     </ListItem>
                     <Divider />
                </List>

             </ContentCard>
            )
        }
    
    }
    
export default withStyles(styles)(stdlistCard);