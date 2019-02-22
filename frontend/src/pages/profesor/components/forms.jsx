import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import IconDone from "@material-ui/icons/Done";
import TextField from "@material-ui/core/TextField";
import ListButton from "../../../common/list-button/listButton";

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
    width: 400
  }
});

class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = { test: this.props.test };
  }

  handleChange = event => {
    console.log(event.target.name);
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  };

  handleAnswerChange = (qIndex, aIndex) => event => {
    let { test } = this.state;
    test.questions[qIndex].answers[aIndex].answer = event.target.value;
    this.setState({ test: test });
  };

  handleQuestionChange = qIndex => event => {
    let { test } = this.state;
    test.questions[qIndex].text = event.target.value;
    this.setState({ test: test });
  };

  handleTestNameChange = event => {
    let { test } = this.state;
    test.name = event.target.value;
    this.setState({ test: test });
  };

  genQuestion = (question, qIndex, classes) => (
    <div className={classes.question}>
      <TextField
        align="left"
        variant="title"
        InputProps={{
          classes: {
            input: classes.questionTitleInput
          }
        }}
        onChange={this.handleQuestionChange(qIndex)}
        className={classes.questionTitle}
        value={question.text}
      />
      <RadioGroup
        onChange={this.handleChange}
        name={qIndex.toString()}
        value={this.state[qIndex.toString()]}
      >
        {question.answers.map((answer, aIndex) => {
          return (
            <div>
              <Radio
                classes={{ label: classes.radioLabel }}
                value={aIndex.toString() + qIndex.toString()}
              />
              <TextField
                onChange={this.handleAnswerChange(qIndex, aIndex)}
                value={this.state.test.questions[qIndex].answers[aIndex].answer}
              />
            </div>
          );
        })}
      </RadioGroup>
      <ListButton primary="+" classes={{ root: classes.addAnswer }} />
    </div>
  );

  render() {
    const { classes } = this.props;
    const { test } = this.state;
    const { questions } = test;
    return (
      <div className={classes.root}>
        <TextField
          onChange={this.handleTestNameChange}
          className={classes.testName}
          InputProps={{ classes: { input: classes.testNameInput } }}
          value={test.name}
          align="right"
        >
          {test.name}
        </TextField>
        {questions.map((question, index) => {
          return this.genQuestion(question, index, classes);
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
