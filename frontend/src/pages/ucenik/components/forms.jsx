import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import { Typography, Icon } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import IconDone from "@material-ui/icons/Done";

const styles = theme => ({
  root: {
    position: "relative",
    marginTop: 35,
    alignContent: "left"
  },
  question: {
    marginBottom: 40,
    paddingLeft: 15,
    borderLeftWidth: "3px",
    borderLeftStyle: "solid",
    borderImage: "linear-gradient(180deg, #C33764 0%, #252E73 100%) 2 100%"
  },
  submitButton: {
    marginLeft: 0,
    textAlign: "none"
  },
  testName: {
    position: "fixed",
    width: "35%",
    marginLeft: "40%"
  },
  questionTitle: {
    marginBottom: 15,
    fontSize: 24
  },
  radioLabel: {
    fontSize: 16
  }
});

class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = event => {
    console.log(event.target.name);
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  };

  genQuestion = (question, classes) => (
    <div className={classes.question}>
      <Typography
        align="left"
        variant="title"
        className={classes.questionTitle}
      >
        {question.text}
      </Typography>
      <RadioGroup
        onChange={this.handleChange}
        name={question.text}
        value={this.state[question.text]}
      >
        {question.answers.map(answer => {
          return (
            <FormControlLabel
              classes={{ label: classes.radioLabel }}
              value={answer.answer}
              label={answer.answer}
              control={<Radio />}
            />
          );
        })}
      </RadioGroup>
    </div>
  );

  render() {
    const { classes, test } = this.props;
    const { questions } = test;
    return (
      <div className={classes.root}>
        <Typography
          variant={"display3"}
          className={classes.testName}
          align="right"
        >
          {test.name}
        </Typography>
        {questions.map(question => {
          return this.genQuestion(question, classes);
        })}
        <Button
          variant="extendedFab"
          color="primary"
          className={classes.submitButton}
        >
          <IconDone style={{ marginRight: 8 }} />
          Submit
        </Button>
      </div>
    );
  }
}

Forms.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default withStyles(styles)(Forms);
