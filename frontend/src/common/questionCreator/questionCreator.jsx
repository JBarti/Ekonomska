import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import ContentCard from "../content-card/contentCard";
import Button from "@material-ui/core/Button/Button";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./questionStyle";
import TextField from "@material-ui/core/TextField";
import ucenikApi from "../../data/apiController/ucenik";
import ListButton from "../../common/list-button/listButton";
import ProffesorApi from "../../data/apiController/proffesor";

class Question extends Component {
  constructor(props) {
    super(props);

    let questionsIterator = props.questions[Symbol.iterator]();
    let currentTime = new Date();

    setInterval(() => {
      if (this.state.duration) {
        let currentTime = new Date().getTime() - this.state.startTime;
        let endTime = this.state.endTime - this.state.startTime;
        console.log((currentTime / endTime) * 100);
        let percent = (currentTime / endTime) * 100;
        this.setState({ progressValue: percent });
      }
    }, 1000);

    setInterval(() => {
      if (this.state.duration)
        this.setState({ duration: this.state.duration - 1 });
    }, 60000);

    this.state = {
      value: "denis",
      fade: true,
      questions: props.questions,
      currentQuestionIndex: 0,
      startTime: currentTime.getTime(),
      endTime: currentTime.getTime() + props.duration * 60 * 1000,
      duration: props.duration,
      answers: {}
    };
  }

  signGen = () => {
    var sign = "@";

    return () => {
      let signCharCode = sign.charCodeAt(0);
      sign = String.fromCharCode(signCharCode + 1);
      return sign;
    };
  };

  handleChange = (questionIndex, answerIndex) => ev => {
    let questions = this.state.questions;
    let question = questions[questionIndex];
    let answer = question.answers[answerIndex];
    answer.answer = ev.target.value;
    this.setState({ questions });
  };

  handleQuestionChange = ev => {
    let questions = this.state.questions;
    let question = questions[this.state.currentQuestionIndex];
    question.text = ev.target.value;
    this.setState({ questions });
  };

  answerOption = (classes, sign, answer, currentQuestionIndex, answerIndex) => {
    let questions = this.state.questions;
    let question = questions[currentQuestionIndex];
    let answerObj = question.answers[answerIndex];
    return (
      <div
        className={
          answerObj.isCorrect ? classes.answerSelected : classes.answer
        }
      >
        <div
          name={sign}
          onClick={this.answerClick(currentQuestionIndex, answerIndex)}
          className={classes.answerOverlay}
        />
        <Typography className={classes.answerNum} variant="headline">
          {sign}
        </Typography>
        <TextField
          className={classes.answerText}
          variant="headline"
          value={answer}
          onChange={this.handleChange(currentQuestionIndex, answerIndex)}
        />
      </div>
    );
  };

  submit = () => {
    ProffesorApi.addTest({
      questions: this.state.questions,
      lesson: this.props.lesson,
      gradeId: this.props.gradeId,
      testName: this.props.testName,
      testId: this.props.testId
    }).then(data => {
      window.location.reload();
    });
  };

  answerClick = (questionIndex, answerIndex) => ev => {
    let questions = this.state.questions;
    let question = questions[questionIndex];
    let answerObj = question.answers[answerIndex];
    answerObj.isCorrect = !answerObj.isCorrect;
    this.setState({ questions });
    console.log({ question });
  };

  changeQuestion = next => {
    return () => {
      let { currentQuestionIndex } = this.state;
      currentQuestionIndex += next ? 1 : -1;
      this.setState({ fade: false });
      setTimeout(
        () =>
          this.setState({
            currentQuestionIndex,
            fade: true
          }),
        200
      );
    };
  };

  addQuestion = () => {
    let questions = this.state.questions;
    questions.push({
      answers: [],
      text: ""
    });
    this.setState({ questions });
    this.changeQuestion(true)();
  };

  addAnswer = () => {
    let questions = this.state.questions;
    let question = questions[this.state.currentQuestionIndex];
    question.answers.push({
      answer: "",
      isCorrect: false
    });
    this.setState({ questions });
  };

  render() {
    const { classes } = this.props;
    const signGen = this.signGen();
    const { questions } = this.state;
    let currentQuestionIndex = this.state.currentQuestionIndex;
    let currentQuestion = this.state.questions[currentQuestionIndex];

    return (
      <div className={classes.root}>
        <ContentCard classes={{ children: classes.card }}>
          <div className={classes.questionCard}>
            <Typography variant="headline" className={classes.questionNumber}>
              Pitanje {currentQuestionIndex + 1}/{questions.length}
            </Typography>
            <div className={classes.timer}>
              <CircularProgress
                color="secondary"
                thickness={1}
                size={175}
                variant="static"
                value={100 - this.state.progressValue}
                className={classes.circle}
              />
              <div className={classes.time}>{this.state.duration}</div>
            </div>
            <TextField
              value={currentQuestion.text}
              variant="subheading"
              className={classes.questionText}
              onChange={this.handleQuestionChange}
            />
          </div>
          <div className={classes.answerCard}>
            <Fade in={this.state.fade} timeout={200}>
              <div className={classes.answerContainer}>
                {currentQuestion.answers.map((data, index) => {
                  console.log({ index });
                  return this.answerOption(
                    classes,
                    signGen(),
                    data.answer,
                    currentQuestionIndex,
                    index
                  );
                })}
                <ListButton
                  icon={<div />}
                  primary="+"
                  classes={{ listItemText: classes.addAnswer }}
                  onClick={this.addAnswer}
                />
              </div>
            </Fade>
            <div className={classes.answerNavbar}>
              <Button
                className={classes.answerNavButton}
                disabled={currentQuestionIndex === 0}
                onClick={this.changeQuestion(false)}
              >
                Previous
              </Button>
              <Button className={classes.answerNavButton} onClick={this.submit}>
                SUBMIT
              </Button>
              {currentQuestionIndex + 1 < questions.length ? (
                <Button
                  className={classes.answerNavButton}
                  onClick={this.changeQuestion(true)}
                >
                  Next
                </Button>
              ) : (
                <Button
                  className={classes.answerNavButton}
                  onClick={this.addQuestion}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </ContentCard>
      </div>
    );
  }
}

export default withStyles(styles)(Question);
