import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  IconButton
} from "@material-ui/core";
import { Bar } from "react-chartjs-2";
import { red, green, grey } from "@material-ui/core/colors";
import {
  ArrowUpward,
  ArrowDownward,
  KeyboardArrowLeft,
  KeyboardArrowRight
} from "@material-ui/icons";

const styles = theme => ({
  root: {
    width: "40%",
    marginLeft: 10,
    overflowY: "hidden",
    overflowX: "auto"
  },
  cardContent: {
    height: "100%"
  },
  arrowUpColor: {
    color: green[400]
  },
  arrowDownColor: {
    color: red[400]
  }
});

class TotalCard extends Component {
  constructor(props) {
    super(props);
    this.state = { displayedYear: 1 };
  }

  totalOutcome = (outcomes, year) => {
    return outcomes
      .filter(outcome => {
        return (
          outcome.duration === null ||
          (outcome.duration + outcome.year > year && outcome.year <= year) ||
          outcome.year === year
        );
      })
      .map(
        outcome =>
          outcome.amount + (outcome.change === undefined ? 0 : outcome.change)
      )
      .reduce((prev, next) => prev + next, 0);
  };

  render() {
    let { classes, outcomes, incomes } = this.props;
    let { displayedYear } = this.state;

    let totalOutcome = this.totalOutcome(outcomes, displayedYear);
    console.log({ totalOutcome });

    let totalIncome = incomes
      .map(income => income.amount)
      .reduce((prev, next) => prev + next, 0);

    let difference = totalIncome - totalOutcome;

    let savings =
      totalIncome * displayedYear -
      [...Array(displayedYear).keys()]
        .map(year => {
          return this.totalOutcome(outcomes, year + 1);
        })
        .reduce((prev, next) => {
          return prev + next;
        }, 0);

    return (
      <Card elevation={5} className={classes.root}>
        <CardHeader
          title={`Ukupno stanje`}
          action={
            <div style={{ height: 20 }}>
              <IconButton
                disabled={displayedYear === 1}
                onCLick={() => {
                  console.log("ASPDJAS");
                }}
              >
                <KeyboardArrowLeft
                  onClick={
                    displayedYear > 1
                      ? () => {
                          this.setState({ displayedYear: displayedYear - 1 });
                        }
                      : () => {
                          console.log("NON");
                        }
                  }
                />
              </IconButton>
              <Typography
                variant={"subheading"}
                style={{ display: "inline", marginRight: 20 }}
              >
                Godina: {Number(displayedYear)}
              </Typography>
              <IconButton
                disabled={displayedYear >= 7}
                onCLick={() => {
                  console.log("ASPDJAS");
                }}
              >
                <KeyboardArrowRight
                  onClick={
                    displayedYear < 7
                      ? () => {
                          this.setState({ displayedYear: displayedYear + 1 });
                        }
                      : () => {
                          console.log("NON");
                        }
                  }
                />
              </IconButton>
            </div>
          }
        />
        <Divider />
        <CardContent className={classes.cardContent}>
          <div
            style={{
              height: "75%",
              marginTop: 10,
              display: "flex",
              flexDirection: "row"
            }}
          >
            <div style={{ width: "30%" }}>
              <Bar
                data={{
                  labels: ["income", "outcome"],
                  datasets: [
                    {
                      label: "Ukupno stanje",
                      backgroundColor: [green[200], red[200]],
                      borderWidth: 2,
                      borderColor: [green[400], red[400]],
                      data: [
                        { x: "prihodi", y: totalIncome },
                        { x: "rashodi", y: totalOutcome }
                      ]
                    }
                  ]
                }}
                options={{
                  legend: { display: false },
                  maintainAspectRatio: false,
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          min: 0
                        }
                      }
                    ],
                    xAxes: [
                      {
                        barThickness: 100
                      }
                    ]
                  }
                }}
              />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "cennter",
                  alignItems: "center"
                }}
              >
                <span>
                  {difference > 0 ? (
                    <ArrowUpward
                      style={{ fontSize: 60, marginRight: 10 }}
                      color={"primary"}
                      classes={{ colorPrimary: classes.arrowUpColor }}
                    />
                  ) : (
                    <ArrowDownward
                      style={{ fontSize: 60, marginRight: 10 }}
                      color={"primary"}
                      classes={{ colorPrimary: classes.arrowDownColor }}
                    />
                  )}
                </span>
                <span
                  style={{
                    fontSize: 30,
                    color: difference > 0 ? green[500] : red[500]
                  }}
                >
                  {difference} kn/mj
                </span>
              </div>
              <div style={{ height: "100%", width: "50%" }}>
                <div style={{ fontSize: 20, color: grey[700] }}>
                  Prihodi: {totalIncome} kn/mj
                </div>
                <br />
                <div style={{ fontSize: 20, color: grey[700] }}>
                  Rashodi: {totalOutcome} kn/mj
                </div>
                <br />
                <div style={{ fontSize: 20, color: grey[700] }}>
                  Ušteđevina: {savings} kn/mj
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(TotalCard);
