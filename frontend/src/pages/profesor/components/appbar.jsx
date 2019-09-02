import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Icon, Button, Chip, Avatar } from "@material-ui/core";
import Appbar from "../../../common/appbar/appbar";
import { logOut } from "../../../actions/proffesorActions";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import "./appbar.css";

const styles = theme => ({
  avatar: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.common.white,
    display: "inline"
  },
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
    const { classes, firstName, lastName } = this.props;
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
              {firstName + " " + lastName}
            </Typography>
          </div>
        </div>
        <Button onClick={this.logOut} variant="outlined" style={{ color: "white" }}>
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
    firstName: store.proffesor.firstName,
    lastName: store.proffesor.lastName
  };
})(withStyles(styles)(UcenikAppBar));
