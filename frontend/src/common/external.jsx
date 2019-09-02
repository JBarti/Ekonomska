import React, { Component } from "react";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    zIndex: 3000,
    overflow: "hidden",
    position: "relative"
  },
  content: {
    height: "100%",
    alignItems: "center"
  }
});

class External extends Component {
  expandContent = () => {
    this.setState({ fullscreen: !this.state.fullscreen });
  };

  render() {
    const { classes } = this.props;
    const { location } = this.props;
    return (
      <div className={classes.root}>
        <iframe src={this.props.url} height="100%" width="100%" />
      </div>
    );
  }
}

export default withStyles(styles)(External);
