import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Question from "./question/question";
import { connect } from "react-redux";
import { solveTest } from "../../../actions/studentActions";

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

    this.state = {
      fullscreen: false,
      currentPage: "Home",
      animate: true,
      test: props.test,
      currentQuestion: 0,
      answers: []
    };
  }

  nextQuestionDisabled = () => {
    let { currentPage, test } = this.state;
    return currentPage === test.questions.length + 1;
  };

  previousQuestionDisabled = () => {
    return this.state.currentQuestion === 0;
  };

  answerQuestion = answer => () => {
    let { currentQuestion, test } = this.state;

    let answers = [...this.state.answers];
    answers.push(answer);

    if (currentQuestion !== test.questions.length - 1) {
      currentQuestion += 1;
    } else {
      let { dispatch, studentId, test, handleClose } = this.props;
      dispatch(solveTest(test.id, answers, studentId));
      handleClose();
    }

    this.setState({ answers: answers });
    this.setState({ currentQuestion: currentQuestion });
  };

  render() {
    const { classes } = this.props;
    let { currentQuestion } = this.state;
    let { test } = this.state;
    return (
      <div className={classes.root}>
        <Question
          question={test.questions[currentQuestion]}
          questionNumbers={{
            questionNumber: currentQuestion + 1,
            questionsLength: test.questions.length
          }}
          answerQuestion={this.answerQuestion}
        />
      </div>
    );
  }
}

export default connect()(withStyles(styles)(Quiz));
