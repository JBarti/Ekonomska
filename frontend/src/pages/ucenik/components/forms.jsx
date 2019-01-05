import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  root: {}
});

const genQuestion = question => (
  <div>
    <Typography variant="title">{question.text}</Typography>
  </div>
);

class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = { fullscreen: false, currentPage: "Home", animate: true };
  }
  render() {
    const { classes, test } = this.props;
    const { questions } = test;
    return (
      <div>
        {questions.map(question => {
          return genQuestion(question);
        })}
      </div>
    );
  }
}

Forms.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default withStyles(styles)(Forms);
