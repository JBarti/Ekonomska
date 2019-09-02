import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ContentCard from "../../../common/content-card/contentCard";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import UcenikDetalji from "./ucenikDetalji";
import AddNewClass from "./addNewClass";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    overflow: "hidden",
    width: "100%"
  },
  addBtn: {
    float: "right"
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
    const { classes, grades } = this.props;
    return (
      <ContentCard
        cardName={
          <div>
            <div>Moji razredi</div>
            <AddNewClass />
          </div>
        }
        className={classes.root}
      >
        <List component="nav" className={classes.root}>
          {this.props.all.map(grade => (
            <UcenikDetalji grade={grade} />
          ))}
          <Divider />
        </List>
      </ContentCard>
    );
  }
}

export default connect(store => {
  return {
    all: store.grades.all || []
  };
})(withStyles(styles)(stdlistCard));
