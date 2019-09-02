import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import { Typography, Icon } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import IconDone from "@material-ui/icons/Done";
import { solveTest } from "../../../actions/studentActions";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    position: "relative",
    background: "linear-gradient(180deg, rgba(78,84,200,1) 40%, white 40%)",
    backgroundAttachment: "fixed",
    paddingTop: 20,
    margin: "0 auto"
  },
  question: {
    marginTop: 20,
    marginBottom: 20,
    padding: 25,
    display: "table",
    margin: "0 auto",
    boxShadow: " 0px 0px 15px -5px rgba(0,0,0,0.75)",
    backgroundColor: "white"
  },
  submitButton: {
    margin: "0 auto",
    textAlign: "center"
  },
  testName: {
    marginLeft: 10,
    color: "white",
    display: "table-row"
  },
  testNameInput: {
    fontSize: "3.5rem"
  },
  questionTitleInput: {
    fontSize: 24
  },
  questionTitle: {
    marginBottom: 15,
    width: 400
  },
  radioLabel: {
    fontSize: 16
  },
  addAnswer: {
    float: "right"
  },
  addQuestion: {
    width: 450,
    margin: "0 auto",
    marginBottom: 40
  },
  btnalign: {
    width: "450px",
    margin: "0 auto"
  }
});

class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = { answers: [] };
  }

  handleChange = event => {
    console.log(event.target.name);
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  };

  handleFormChange = event => {
    let newState = { ...this.state };
    newState.answers[Number(event.target.name)] = event.target.value;
    this.setState(newState);
    console.log(this.state);
  };

  submitTest = () => {
    let answers = this.state.answers;
    let { dispatch, studentId, test, handleClose } = this.props;
    dispatch(solveTest(test.id, answers, studentId));
    handleClose();
  };

  genQuestion = (question, aIndex, classes) => {
    let answers = question.answers || [];
    return (
      <div className={classes.question}>
        <Typography
          align="left"
          variant="title"
          className={classes.questionTitle}
        >
          {question.text}
        </Typography>
        <RadioGroup
          onChange={this.handleFormChange}
          name={question.id.toString()}
          value={this.state.answers[question.id]}
        >
          {answers.map((answer, qIndex) => {
            console.log(question.id.toString() + qIndex.toString());
            return (
              <FormControlLabel
                classes={{ label: classes.radioLabel }}
                value={question.id.toString() + qIndex.toString()}
                label={answer.answer}
                control={<Radio />}
              />
            );
          })}
        </RadioGroup>
      </div>
    );
  };

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
        {questions.map((question, index) => {
          return this.genQuestion(question, index, classes);
        })}
        <div className={classes.btnalign}>
          <Button
            variant="extendedFab"
            color="primary"
            className={classes.submitButton}
            onClick={this.submitTest}
          >
            <IconDone style={{ marginRight: 8 }} />
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

Forms.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default connect()(withStyles(styles)(Forms));
