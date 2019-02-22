import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import IconDone from "@material-ui/icons/Done";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { addTest } from "../../../actions/proffesorActions";

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
  },
  addQuestion: {
    width: 450,
    marginBottom: 40
  }
});

class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = { test: this.props.test };
  }

  handleChange = event => {
    console.log("CHAAAAAAAAAAAAAAAAAANG");
    console.log(event.target.name);
    console.log(this.state);
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAnswerChange = (qIndex, aIndex) => event => {
    let { test } = this.state;
    test.questions[qIndex].answers[aIndex].answer = event.target.value;
    this.setState({ test: test });
    console.log(this.state);
  };

  handleQuestionChange = qIndex => event => {
    let { test } = this.state;
    test.questions[qIndex].text = event.target.value;
    this.setState({ test: test });
  };

  handleGoodAnswerChange = event => {
    let name = event.target.name.split(" ");
    let qIndex = Number(name[0]);
    let aIndex = Number(name[1]);
    console.log(this.state.test);
    let test = { ...this.state.test };
    let question = test.questions[qIndex];
    question.answers.forEach(answer => {
      answer.isCorrect = false;
    });
    question.answers[aIndex].isCorrect = true;
    this.setState({ test: test });
  };

  handleTestNameChange = event => {
    let { test } = this.state;
    test.name = event.target.value;
    this.setState({ test: test });
  };

  addNewAnswer = qIndex => () => {
    let test = { ...this.state.test };
    let answer = { answer: "", isCorrect: false };
    test.questions[qIndex].answers.push(answer);
    this.setState({ test: test });
  };

  addNewQuestion = () => {
    let test = { ...this.state.test };
    let question = { text: "", answers: [] };
    test.questions.push(question);
    this.setState({ test: test });
  };

  submit = () => {
    let { dispatch, folderId } = this.props;
    dispatch(addTest(folderId, this.state.test));
  };

  genQuestion = (question, qIndex, classes) => {
    let answers = question.answers || [];
    return (
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
        <RadioGroup name={qIndex.toString()}>
          {answers.map((answer, aIndex) => {
            return (
              <div>
                <Radio
                  classes={{ label: classes.radioLabel }}
                  name={qIndex.toString() + " " + aIndex.toString()}
                  onChange={this.handleGoodAnswerChange}
                  checked={
                    this.state.test.questions[qIndex].answers[aIndex].isCorrect
                  }
                />
                <TextField
                  onChange={this.handleAnswerChange(qIndex, aIndex)}
                  value={
                    this.state.test.questions[qIndex].answers[aIndex].answer
                  }
                />
              </div>
            );
          })}
        </RadioGroup>
        <Button
          classes={{ root: classes.addAnswer }}
          onClick={this.addNewAnswer(qIndex)}
          icon={<div />}
          variant="outlined"
        >
          +
        </Button>
      </div>
    );
  };

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
          classes={{ root: classes.addQuestion }}
          icon={<div />}
          variant="outlined"
          onClick={this.addNewQuestion}
        >
          Novo pitanje
        </Button>
        <br />
        <Button
          variant="extendedFab"
          color="primary"
          className={classes.submitButton}
          onClick={this.submit}
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

export default connect()(withStyles(styles)(Forms));
