import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  ListSubheader
} from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%",
    marginLeft: 10,
    overflowY: "auto"
  },
  cardContent: {},
  cardDiv: {
    width: "100%",
    boxSizing: "content-box",
    overflow: "hidden",
    padding: "1%",
    zIndex: 0
  },
  grade: {
    borderRadius: 20,
    background:
      "-moz-linear-gradient(-45deg, rgba(78,84,200,1) 0%, rgba(143,148,251,1) 100%);",

    paddingBottom: 20
  },
  gradeNum: {
    fontSize: 40,
    height: 58,
    width: 58,
    textAlign: "center",
    border: "5px solid #66BB6A",
    borderRadius: 1000,
    display: "inline-block"
  },
  gradeRatio: {
    display: "inline-block",
    fontSize: 16,
    marginLeft: 40
  },
  status: {
    display: "inline-block",
    width: "58%",
    paddingBottom: 10,
    paddingRight: 50
  },
  bar: {
    width: "100%",
    height: 20,
    borderRadius: 1000
  },
  testName: {
    fontSize: 25,
    paddingLeft: 2,
    paddingRight: 2
  },
  ratio: {
    float: "right"
  }
});

const GradeDisplay = props => {
  let { classes, solution } = props;
  let { name, percentage, grade, testPoints, isQuiz } = solution;
  let achievedPoints = testPoints * (percentage / 100);
  console.log(solution);
  return (
    <ListItem>
      <ListItemText
        classes={{
          primary: classes.gradeNum,
          secondary: classes.gradeRatio
        }}
        primary={grade}
        secondary={
          <div>
            <span className={classes.testName}>{name}</span>{" "}
          </div>
        }
      />
      <ListItemSecondaryAction className={classes.status}>
        <div style={{ width: "100%" }}>
          <span className={classes.precentage}>{percentage}%</span>
          <span className={classes.ratio}>
            {achievedPoints}/{testPoints}
          </span>
        </div>
        <div
          className={classes.bar}
          style={{
            background: `-moz-linear-gradient(left, rgba(78,84,200,1) 0%, rgba(143,148,251,1) ${percentage}%, rgba(232,232,232,1) ${percentage}%, rgba(232,232,232,1) 100%)`
          }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

class GradesCard extends Component {
  state = { open: null };
  expandTab = panel => (event, expanded) => {
    if (panel === this.state.open) {
      this.setState({ open: null });
    } else {
      this.setState({ open: panel });
    }
  };

  render() {
    const { classes, tests, solutions } = this.props;
    const { value } = this.state;
    let id = 0;

    const rows = solutions
      .map(solution => {
        if (!solution) {
          return;
        }
        let test = tests.filter(test => test.id === solution.testId)[0];
        let testPoints = test.questions.length;
        let acquiredPoints = solution.points;
        let percentage = (acquiredPoints / testPoints) * 100;
        let grade = (() => {
          grade = 1;
          switch (percentage) {
            case percentage <= 50: {
              grade = 1;
              break;
            }
            case percentage <= 60: {
              grade = 2;
              break;
            }
            case percentage <= 75: {
              grade = 3;
              break;
            }
            case percentage <= 90: {
              grade = 4;
              break;
            }
            case percentage <= 100: {
              grade = 5;
              break;
            }
          }
          return grade;
        })();
        console.log("GRADE");
        console.log(testPoints);

        return {
          name: test.name,
          percentage: percentage,
          grade: grade,
          testPoints: testPoints,
          isQuiz: test.isQuiz
        };
      })
      .filter(data => !!data);

    const data = rows.map(row => {
      return { name: row.name, Postotak: row.postotak };
    });

    console.log(rows);
    return (
      <Card elevation={5} className={classes.root}>
        <ListSubheader component="div" className={classes.subheader}>
          Ocjene
          <Divider />
        </ListSubheader>
        <CardContent className={classes.cardContent}>
          <List>
            {rows.map(solution => (
              <div>
                <GradeDisplay classes={classes} solution={solution} />
                <Divider />
              </div>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(GradesCard);
