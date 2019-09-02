import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Question from "./question/question";
import { Button } from "@material-ui/core";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { addTest, lockTestUp } from "../../../actions/proffesorActions";
import { connect } from "react-redux";

const styles = theme => {
  console.log(theme);
  return {
    root: {
      width: "100%",
      height: "90%"
    },
    content: {
      height: "100%",
      alignItems: "center"
    },
    questionContainer: {
      marginTop: 80,
      paddingLeft: 160
    },
    navContainer: {
      display: "flex",
      flexDirection: "row",
      width: "100%"
    },
    navButton: {
      width: "100%"
    }
  };
};

class Quiz extends Component {
  constructor(props) {
    super(props);

    if (props.test.questions.length === 0) {
      let question = {
        text: "",
        answers: [
          { answer: "", isCorrect: true },
          { answer: "", isCorrect: false },
          { answer: "", isCorrect: false },
          { answer: "", isCorrect: false }
        ]
      };
      console.log("QUESTIOOOON", question);
      props.test.questions.push(question);
    }

    this.state = {
      fullscreen: false,
      currentPage: "Home",
      animate: true,
      test: props.test,
      currentQuestion: 0
    };
  }

  changeCorrect = event => {
    let test = { ...this.state.test };
    console.log(test);
    let question = test.questions[this.state.currentQuestion];
    console.log("QUESTION", question);
    question.answers = question.answers.map(answer => {
      answer.isCorrect = false;
      return answer;
    });
    let answer = question.answers[event.target.name];
    answer.isCorrect = true;
    this.setState({ test: test });
  };

  changeAnswer = event => {
    let test = { ...this.state.test };
    let question = test.questions[this.state.currentQuestion];
    let answer = question.answers[event.target.name];
    answer.answer = event.target.value;
    this.setState({ test: test });
    console.log(event.target.value);
  };

  changeQuestion = event => {
    let test = { ...this.state.test };
    let question = test.questions[this.state.currentQuestion];
    question.text = event.target.value;
    console.log(event.target.value);
    console.log(question);
    this.setState({ test: test });
  };

  nextQuestionDisabled = () => {
    console.log("KOLD");
    let question = this.state.test.questions[this.state.currentQuestion];
    let emptyAnswersNum = question.answers.filter(
      answer => answer.answer === ""
    ).length;
    let isEmptyQuestion = question.text === "";

    console.log(emptyAnswersNum);
    console.log(isEmptyQuestion);
    if (emptyAnswersNum > 0 || isEmptyQuestion) {
      return true;
    }
    return false;
  };

  previousQuestionDisabled = () => {
    return this.state.currentQuestion === 0;
  };

  nextQuestion = () => {
    let currentQuestion = this.state.currentQuestion + 1;
    let test = { ...this.state.test };

    if (currentQuestion !== test.questions.length) {
      this.setState({ currentQuestion: currentQuestion });
      return;
    }

    let question = {
      text: "",
      answers: [
        { answer: "", isCorrect: true },
        { answer: "", isCorrect: false },
        { answer: "", isCorrect: false },
        { answer: "", isCorrect: false }
      ]
    };

    test.questions.push(question);
    this.setState({ test: test, currentQuestion: currentQuestion });
  };

  previousQuestion = () => {
    let currentQuestion = this.state.currentQuestion - 1;
    this.setState({ currentQuestion: currentQuestion });
  };

  removeQuestion = () => {
    let test = { ...this.state.test };
    let { currentQuestion } = this.state;
    test.questions.splice(currentQuestion, 1);

    if (currentQuestion === 0) {
      currentQuestion += 1;
    } else {
      currentQuestion -= 1;
    }

    this.setState({ test: test, currentQuestion: currentQuestion });
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

  render() {
    const { classes } = this.props;
    let { currentQuestion } = this.state;
    let { test } = this.state;
    let { locked } = test;
    return (
      <div className={classes.root}>
        <Question
          question={test.questions[currentQuestion]}
          questionNumbers={{
            questionNumber: currentQuestion + 1,
            questionsLength: test.questions.length
          }}
          changeQuestion={this.changeQuestion}
          changeCorrect={this.changeCorrect}
          changeAnswer={this.changeAnswer}
          duration={50}
        />
        <div className={classes.navContainer}>
          <Button
            variant="raised"
            color="primary"
            disabled={this.nextQuestionDisabled() || locked}
            onClick={this.submit}
          >
            SPREMI
          </Button>
          <Button
            variant="raised"
            color="secondary"
            disabled={this.nextQuestionDisabled() || locked}
            onClick={this.lockTest}
          >
            ZAKLJUČAJ
          </Button>
          <Button
            className={classes.navButton}
            disabled={this.previousQuestionDisabled()}
            onClick={this.previousQuestion}
          >
            <ArrowLeft />
          </Button>
          <Button
            className={classes.navButton}
            disabled={
              this.nextQuestionDisabled() ||
              (currentQuestion == test.questions.length - 1 && locked)
            }
            onClick={this.nextQuestion}
          >
            <ArrowRight />
          </Button>
          {!locked ? (
            <Button
              variant="raised"
              color="primary"
              onClick={this.removeQuestion}
            >
              IZBRIŠI
            </Button>
          ) : (
            undefined
          )}
        </div>
      </div>
    );
  }
}

export default connect()(withStyles(styles)(Quiz));
