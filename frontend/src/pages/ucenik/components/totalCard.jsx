import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography
} from "@material-ui/core";
import { Bar } from "react-chartjs-2";
import { red, green, grey } from "@material-ui/core/colors";
import { ArrowUpward } from "@material-ui/icons";

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
  }
});

class TotalCard extends Component {
  render() {
    let { classes, outcomes, incomes } = this.props;
    let totalOutcome = outcomes
      .map(
        outcome =>
          outcome.amount + (outcome.change === undefined ? 0 : outcome.change)
      )
      .reduce((prev, next) => prev + next, 0);
    let totalIncome = incomes
      .map(income => income.amount)
      .reduce((prev, next) => prev + next, 0);
    let difference = totalIncome - totalOutcome;
    console.log(totalIncome, totalOutcome);
    return (
      <Card elevation={5} className={classes.root}>
        <CardHeader title={`Ukupno stanje`} />
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
                  <ArrowUpward
                    style={{ fontSize: 60, marginRight: 10 }}
                    color={"primary"}
                    classes={{ colorPrimary: classes.arrowUpColor }}
                  />
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
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(TotalCard);