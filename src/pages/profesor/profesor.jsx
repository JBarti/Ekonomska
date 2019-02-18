import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Content from "../../common/content/content";
import Row from "../../common/content/row/row";
import UcenikAppBar from "./components/appbar";
import NotificationCard from "./components/notificationCard";
import NotesCard from "./components/notesCard";
import Dashboard from "./components/dashboard";
import External from "./components/external";
import { connect } from "react-redux";
import { loadSession } from "../../actions/proffesorActions";

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

const defaultContent = (
  <div style={{ height: "calc(100% - 65px)" }}>
    <Row>
      <NotesCard />
    </Row>
    <Row>
      <NotificationCard />
    </Row>
  </div>
);

class Profesor extends Component {
  componentWillMount() {
    this.props.dispatch(loadSession());
  }

  state = {
    fullscreen: true,
    expanded: true,
    currentPage: "Home",
    animate: true
  };

  expandContent = () => {
    this.setState({ fullscreen: !this.state.fullscreen });
  };

  showMenu = () => {
    this.setState({
      open: !this.state.open,
      expanded: !this.state.expanded
    });
  };

  changeContent = content => {
    this.setState({ animate: false });
    setTimeout(() => {
      this.setState({
        animate: true,
        currentPage: content.name,
        content: content.component
      });
    }, 300);
  };

  render() {
    const { classes, firstName, lastName } = this.props;

    return (
      <div>
        <UcenikAppBar
          expanded={this.state.expanded}
          onFullscreen={this.expandContent}
          onMenu={this.showMenu}
          name={firstName + " " + lastName}
        />
        <Content expanded={this.state.expanded}>
          {this.state.content}
          <Dashboard />
        </Content>
      </div>
    );
  }
}
export default connect(store => {
  return {
    firstName: store.proffesor.firstName,
    lastName: store.proffesor.lastName
  };
})(withStyles(styles)(Profesor));
