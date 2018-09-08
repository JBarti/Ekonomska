import React, { Component } from 'react';
import './user.css';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Folder from '@material-ui/icons/Folder';
import Description from'@material-ui/icons/Description';
import Assignment from'@material-ui/icons/Assignment';
import SvgIcon from '@material-ui/core/SvgIcon';
import Payment from '@material-ui/icons/Payment';

class Module extends Component {
 state = { open: false };


  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };


 render(){
  
  function FolderIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 5L8 3H3c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1h-5z"/>
    </SvgIcon>
  );
}


        return(
      <div>
                   <ListItem button onClick={this.handleClick}>
                     <ListItemIcon>
                        <Folder />
                     </ListItemIcon>
                     <ListItemText inset disableTypography
                    primary={<Typography type="body2" style={{ color: '#333333', fontSize: "1em" }}>Lekcija</Typography>} />
                       {this.state.open ? <ExpandLess /> : <ExpandMore />}
                   </ListItem>
                   <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                   <List component="div" disablePadding>
                    <ListItem button>
                   <ListItemIcon>
                     <Description />
                   </ListItemIcon>
                   <ListItemText inset primary="Udžbenik" />
                  </ListItem>
                   <ListItem button disabled>
                   <ListItemIcon>
                     <Assignment />
                   </ListItemIcon>
                   <ListItemText inset primary="Test" />
                  </ListItem>
                  <ListItem button>
                   <ListItemIcon>
                     <Payment />
                   </ListItemIcon>
                   <ListItemText inset primary="Financijski planer" />
                  </ListItem>
                  </List>
                 </Collapse>
            </div> 

        );
  }
}

Module.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Module;