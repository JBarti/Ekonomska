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
  ListSubheader,
  Chip
} from "@material-ui/core";
import { red, green, blue, orange, yellow } from "@material-ui/core/colors";

const styles = theme => ({
  root: {
    width: "100%",
    marginLeft: 10,
    overflowY: "auto"
  },
  cardContent: { paddingTop: 0 },
  cardDiv: {
    width: "100%",
    boxSizing: "content-box",
    overflow: "hidden",
    padding: "1%",
    zIndex: 0
  },
  gradeNum: {
    borderRadius: 5,
    display: "inline-block",
    paddingTop: 2,
    paddingBottom: 3,
    paddingLeft: 7,
    paddingRight: 7,
    marginBottom: 8,
    color: "white"
  },
  gradeRatio: {
    display: "inline-block",
    fontSize: 16,
    marginLeft: 40
  },
  status: {
    display: "inline-block",
    width: "58%"
  },
  bar: {
    width: "100%",
    height: 20,
    borderRadius: 1000
  },
  listTest: {
    flexDirection: "column"
  },
  ratio: {
    float: "right"
  }
});

const GradeDisplay = props => {
  let { classes, solution } = props;
  let { name, percentage, grade, testPoints, isQuiz } = solution;
  percentage = Math.round(percentage);
  let achievedPoints = Math.round(testPoints * (percentage / 100));
  let gradeNumStyle = {
    background: `-moz-linear-gradient(326deg, ${grade.gradient[0]} 36%, ${
      grade.gradient[1]
    } 100%)`,
    background: `-webkit-linear-gradient(326deg, ${grade.gradient[0]} 36%, ${
      grade.gradient[1]
    } 100%)`
  };
  console.log(solution);
  return (
    <ListItem>
      <ListItemText
        className={classes.listText}
        primary={
          <div className={classes.gradeNum} style={gradeNumStyle}>
            Ocjena: {grade.num}
          </div>
        }
        secondary={
          <div>
            <span>{`Ime testa: ${name.toUpperCase()}`}</span>
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
          let grade = { num: 1, gradient: [red[500], red[600]] };
          switch (percentage) {
            case percentage <= 50: {
              grade.num = 1;
              break;
            }
            case percentage <= 60: {
              grade.num = 2;
              grade.gradient = [orange[(500, orange[600])]];
              break;
            }
            case percentage <= 75: {
              grade.num = 3;
              grade.gradient = [yellow[500], yellow[600]];
              break;
            }
            case percentage <= 90: {
              grade.num = 4;
              grade.gradient = [(blue[500], blue[600])];
              break;
            }
            case percentage <= 100: {
              grade.num = 5;
              grade.gradient = [green[500], green[600]];
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
        <CardHeader title={"Ocjene"} className={classes.subheader} />
        <Divider />
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
