import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ContentCard from "../../../common/content-card/contentCard";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import UcenikDetalji from "./ucenikDetalji";
import AddNewClass from "./addNewClass"

const styles = theme => ({
  root: {
    overflow: "hidden",
    width: "100%"
  },
  addBtn: {
    float: "right",
  }
});

class stdlistCard extends Component {
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <ContentCard cardName={<div><div>Moji razredi</div><AddNewClass/></div>}  className={classes.root}>
        <List component="nav" className={classes.root}>
          <UcenikDetalji />
          <Divider />
          <ListItem button>
            <ListItemText primary="4.F" />
          </ListItem>
          <Divider />
        </List>
      </ContentCard>
    );
  }
}

export default withStyles(styles)(stdlistCard);
