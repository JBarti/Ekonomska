import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Content from "../../common/content/content";
import UcenikAppBar from "./components/appbar";
import Dashboard from "./components/dashboard";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { loadSession } from "../../actions/studentActions";

const styles = theme => {
  return {
    sidebarNav: {
      display: "flex",
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap"
    },
    sidebarHeading: {
      paddingLeft: 16
    },
    content: {
      height: "100%"
    }
  };
};

class Ucenik extends Component {
  state = {
    redirect: null
  };
  componentWillMount() {
    this.props.dispatch(loadSession());
  }

  componentDidUpdate() {
    console.log(this.props.fail);
    if (this.props.fail) {
      this.setState({ redirect: <Redirect to="/" /> });
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <UcenikAppBar expanded={true} onMenu={this.showMenu} />
        <Content expanded={true}>
          <Dashboard />
        </Content>
        {this.state.redirect}
      </div>
    );
  }
}
export default connect(store => {
  return {
    fail: store.student.fail
  };
})(withStyles(styles)(Ucenik));
