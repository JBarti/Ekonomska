import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import IconDone from "@material-ui/icons/Done";
import TextField from "@material-ui/core/TextField";
import LockedIcon from "@material-ui/icons/Lock";
import UnlockedIcon from "@material-ui/icons/LockOpen";
import { connect } from "react-redux";
import { addTest, lockTestUp } from "../../../actions/proffesorActions";

const styles = theme => ({
  root: {
    position: "relative",
    background: "linear-gradient(180deg, purple 40%, white 40%)",
    backgroundAttachment: "fixed",
    paddingTop: 20
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
    marginLeft: 0,
    textAlign: "none"
  },
  testName: {
    position: "fixed",
    width: "35%",
    float: "right",
    clear: "left"
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
    console.log("STEJT TEST");
    console.log(this.state.test);
    dispatch(addTest(folderId, this.state.test));
    this.props.reload();
  };

  lockTest = () => {
    let { id, folderId } = this.state.test;
    let { dispatch } = this.props;
    dispatch(lockTestUp(id, folderId));
    this.props.reload();
  };

  genQuestion = (question, qIndex, classes, locked) => {
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
                  classes={{ root: classes.txtfix }}
                  value={
                    this.state.test.questions[qIndex].answers[aIndex].answer
                  }
                />
              </div>
            );
          })}
        </RadioGroup>
        {!locked ? (
          <Button
            classes={{ root: classes.addAnswer }}
            onClick={this.addNewAnswer(qIndex)}
            icon={<div />}
            variant="fab"
            color={"primary"}
          >
            +
          </Button>
        ) : (
          <div />
        )}
      </div>
    );
  };

  render() {
    const { classes } = this.props;
    const { test } = this.state;
    const { questions, locked } = test;
    return (
      <div className={classes.root}>
        {questions.map((question, index) => {
          return this.genQuestion(question, index, classes, locked);
        })}
        <div className={classes.btnalign}>
          {!locked ? (
            <Button
              classes={{ root: classes.addQuestion }}
              icon={<div />}
              variant="outlined"
              onClick={this.addNewQuestion}
            >
              Novo pitanje
            </Button>
          ) : (
            <div />
          )}
          <br />
          <Button
            variant="extendedFab"
            color="primary"
            className={classes.submitButton}
            onClick={this.submit}
            disabled={test.locked}
          >
            <IconDone style={{ marginRight: 8 }} />
            Submit
          </Button>
          <Button
            variant="extendedFab"
            color="primary"
            className={classes.submitButton}
            onClick={this.lockTest}
            style={{ backgroundColor: "#ffd600", marginLeft: 10 }}
            disabled={test.locked}
          >
            {locked ? (
              <LockedIcon style={{ marginRight: 8 }} />
            ) : (
              <UnlockedIcon style={{ marginRight: 8 }} />
            )}
            {locked ? "Locked" : "Lock"}
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
