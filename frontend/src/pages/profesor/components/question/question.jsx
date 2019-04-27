import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import ContentCard from "../../../../common/content-card/contentCard";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import styles from "./questionStyle";

class Question extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    let { answers, text } = this.props.question;
    let {
      changeCorrect,
      changeAnswer,
      changeQuestion,
      questionNumbers
    } = this.props;
    console.log(answers);
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
            <TextField
              className={classes.questionText}
              multiline={true}
              value={text}
              onChange={changeQuestion}
            />
          </div>
          <div className={classes.answerCard}>
            <RadioGroup className={classes.answerContainer}>
              {answers.map((answer, index) => {
                return (
                  <div className={classes.selection}>
                    <Radio
                      name={index}
                      classes={{ root: classes.radio }}
                      checked={answer.isCorrect}
                      onChange={event => {
                        console.log("PROPOVII", this.props);
                        changeCorrect(event);
                      }}
                    />
                    <div className={classes.answer}>
                      <TextField
                        multiline={true}
                        className={classes.quizInput}
                        name={index}
                        onChange={changeAnswer}
                        InputProps={{
                          classes: {
                            input: classes.answerInput
                          }
                        }}
                        value={answer.answer}
                      />
                    </div>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        </ContentCard>
      </div>
    );
  }
}

export default withStyles(styles)(Question);
