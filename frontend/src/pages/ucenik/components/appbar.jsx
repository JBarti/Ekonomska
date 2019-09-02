import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Icon, Button, Chip, Avatar } from "@material-ui/core";
import Appbar from "../../../common/appbar/appbar";
import FinPlanChoice from "../../../common/finPlanChoice";
import { Redirect } from "react-router";
import { logOut } from "../../../actions/studentActions";
import { connect } from "react-redux";

const styles = theme => ({
  username: {
    color: theme.palette.common.white,
    display: "inline"
  },
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "right",
    padding: 8,
    boxSizing: "border-box",
    width: "100%"
  }
});

class UcenikAppBar extends Component {
  state = {
    redirect: null
  };
  logOut = () => {
    let { dispatch } = this.props;
    dispatch(logOut());
    this.setState({ redirect: <Redirect to="/" /> });
  };

  render() {
    const { classes } = this.props;
    return (
      <Appbar
        expanded={
          this.props.expanded
        } /*
                beforeTitle={<IconButton style={{ color: 'white' }}
                    onClick={this.props.onMenu}>
                    <MenuIcon />
                    </IconButton>}*/
      >
        <div id="nameTag">
          <div>
            <Typography className={classes.username} variant="subheading">
              {this.props.firstName + " " + this.props.lastName}
            </Typography>
          </div>
        </div>
        <Button
          onClick={this.logOut}
          variant="outlined"
          style={{ color: "white" }}
        >
          {" "}
          Odjava{" "}
        </Button>
        {this.state.redirect}
      </Appbar>
    );
  }
}

export default connect(store => {
  return {
    firstName: store.student.firstName,
    lastName: store.student.lastName
  };
})(withStyles(styles)(UcenikAppBar));
