import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardHeader, Divider } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import { red, green, grey } from "@material-ui/core/colors";

const styles = theme => ({
  root: {
    width: "100%",
    marginLeft: 10,
    overflowY: "hidden",
    overflowX: "auto"
  },
  cardContent: {
    paddingTop: 0,
    paddingTop: 15
  }
});

class MonthlyCard extends Component {
  constructor(props) {
    super(props);
  }

  getGraphData = () => {
    let { outcomes, incomes } = this.props;
    var graphData = {
      labels: [],
      datasets: [
        {
          fill: true,
          showXLabels: 0,
          data: [],
          borderColor: []
        }
      ]
    };

    for (let displayedYear in [1, 2, 3, 4, 5, 7, 8]) {
      displayedYear = Number(displayedYear) + 1;
      let displayedOutcomes = outcomes.filter(outcome => {
        return (
          outcome.duration === null ||
          (outcome.duration + outcome.year > displayedYear &&
            outcome.year <= displayedYear) ||
          outcome.year === displayedYear
        );
      });

      let totalOutcome = displayedOutcomes
        .map(
          outcome =>
            outcome.amount + (outcome.change === undefined ? 0 : outcome.change)
        )
        .reduce((prev, next) => prev + next, 0);

      let totalIncome = incomes
        .map(income => income.amount)
        .reduce((prev, next) => prev + next, 0);
      let difference = totalIncome - totalOutcome;

      for (let month in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
        month = Number(month) + 1;
        let data = graphData.datasets[0].data;
        let lastData = data[data.length - 1] || 0;
        let currentMoney = difference + lastData;
        let currentColour = currentMoney < 0 ? red[500] : green[500];
        let currentLabel = `y: ${displayedYear} m: ${month}`;
        graphData.labels.push(currentLabel);
        graphData.datasets[0].data.push(currentMoney);
        graphData.datasets[0].borderColor.push(currentColour);
      }
    }
    console.log(graphData);

    return graphData;
  };

  render() {
    let { classes } = this.props;
    let graphData = this.getGraphData();

    return (
      <Card elevation={5} className={classes.root}>
        <CardHeader title={"Financijska projekcija"} />
        <Divider />
        <CardContent
          className={classes.cardContent}
          style={{ display: "flex", flexDirection: "row" }}
        >
          <div style={{ width: "100%" }}>
            <Line
              legend={false}
              height={370}
              options={{
                maintainAspectRatio: false,
                scales: {
                  xAxes: [
                    {
                      ticks: {
                        display: false
                      }
                    }
                  ]
                }
              }}
              data={graphData}
            />
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(MonthlyCard);
