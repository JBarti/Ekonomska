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
  }

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
              <CircularProgress
                color="secondary"
                thickness={1}
                size={175}
                variant="static"
                value={100 - 20}
                className={classes.circle}
              />
              <div className={classes.time}>{10}</div>
            </div>
            <Typography variant="headline">{text}</Typography>
          </div>
          <div className={classes.answerCard}>
            {answers.map((answer, index) => {
              return (
                <Button
                  className={classes.answer}
                  onClick={answerQuestion(String(id) + String(index))}
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
