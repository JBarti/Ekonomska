import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import Question from "../../../common/question/question";

const styles = theme => {
  console.log(theme);
  return {
    root: {
      backgroundColor: "#eeeeee",
      width: "100%",
      height: "100%",
      zIndex: 1,
      overflow: "hidden",
      position: "relative",
      display: "flex"
    },
    content: {
      height: "100%",
      alignItems: "center"
    },
    questionContainer: {
      marginTop: 80,
      paddingLeft: 160
    }
  };
};

class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = { fullscreen: false, currentPage: "Home", animate: true };
  }
  render() {
    const { classes } = this.props;
    return <Question questions={this.props.questions} duration={10} />;
  }
}

Forms.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default withStyles(styles)(Forms);
