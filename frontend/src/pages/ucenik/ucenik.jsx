import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Content from "../../common/content/content";
import UcenikAppBar from "./components/appbar";
import Dashboard from "./components/dashboard";
import { connect } from "react-redux";
import { loadSession } from "../../actions/studentActions";

const styles = theme => {
  console.log(theme);
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
  componentWillMount() {
    this.props.dispatch(loadSession());
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <UcenikAppBar expanded={true} onMenu={this.showMenu} />
        <Content expanded={true}>
          <Dashboard />
        </Content>
      </div>
    );
  }
}
export default connect()(withStyles(styles)(Ucenik));
