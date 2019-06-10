import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import ContentCard from "../../../../common/content-card/contentCard";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup";
import styles from "./questionStyle";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = { time: 10 };
    setTimeout(this.timer, 1000);
  }

  timer = () => {
    let time = this.state.time - 1;
    if (time === 0) {
      this.props.answerQuestion(String(this.props.question.id) + "5")();
      return;
    }
    this.setState({ time: time });
    setTimeout(this.timer, 1000);
  };

  render() {
    const { classes } = this.props;
    let { answers, text, id } = this.props.question;
    let { questionNumbers, answerQuestion } = this.props;
    return (
      <div className={classes.root}>
        <ContentCard classes={{ children: classes.card }} elevation={0}>
          <div className={classes.questionCard}>
            <Typography variant="headline" className={classes.questionNumber}>
              {questionNumbers.questionNumber}/{questionNumbers.questionsLength}
            </Typography>
            <div className={classes.timer}>
              <div className={classes.time}>{this.state.time}</div>
            </div>
            <Typography variant="headline">{text}</Typography>
          </div>
          <div className={classes.answerCard}>
            {answers.map((answer, index) => {
              return (
                <Button
                  className={classes.answer}
                  onClick={() => {
                    console.log("RADI LI ");
                    answerQuestion(String(id) + String(index))();
                  }}
                >
                  {answer.answer}
                </Button>
              );
            })}
          </div>
        </ContentCard>
      </div>
    );
  }
}

export default withStyles(styles)(Question);
