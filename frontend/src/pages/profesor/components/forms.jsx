import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import Question from "../../../common/questionCreator/questionCreator";

const styles = theme => {
  console.log(theme);
  return {
    root: {
      backgroundColor: "#eeeeee",
      width: "100%",
      height: "100vh",
      zIndex: 1,
      overflow: "hidden",
      position: "relative",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center"
    },

    questionContainer: {
      marginTop: 80,
      paddingLeft: 160
    }
  };
};

class Forms extends Component {
  state = {
    fullscreen: false,
    expanded: false,
    currentPage: "Home",
    animate: true
  };

  expandContent = () => {
    this.setState({ fullscreen: !this.state.fullscreen });
  };

  showMenu = () => {
    this.setState({ open: !this.state.open, expanded: !this.state.expanded });
  };

  render() {
    const { classes } = this.props;
    const { questions } = this.props;
    return (
      <div className={classes.root}>
        <Question
          questions={questions}
          duration={10}
          testId={this.props.testId}
          lesson={this.props.lesson}
          gradeId={this.props.gradeId}
          testName={this.props.testName}
        />
      </div>
    );
  }
}

Forms.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default withStyles(styles)(Forms);
