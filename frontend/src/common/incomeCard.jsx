import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Doughnut } from "react-chartjs-2";
import {
  Card,
  CardContent,
  CardHeader,
  ListSubheader,
  Divider,
  Typography
} from "@material-ui/core";
import { red, blue, purple, green } from "@material-ui/core/colors";

const styles = theme => ({
  root: {
    width: "20%",
    marginLeft: 10,
    overflowY: "hidden"
  },
  cardContent: {
    padding: 0,
    paddingTop: 15
  }
});

const IncomeCard = props => {
  let { classes, payment, fees } = props;
  let total =
    payment.amount +
    fees.map(fee => fee.amount).reduce((prev, amount) => (prev += amount));
  let labels = [payment.name].concat(fees.map(fee => fee.name));
  let data = [payment.amount].concat(fees.map(fee => fee.amount));
  let colors = [green[400]].concat(fees.map(() => blue[400]));
  return (
    <Card elevation={5} className={classes.root}>
      <CardHeader title={`Prihodi: ${total} kn/mj`} />
      <Divider />
      <CardContent className={classes.cardContent}>
        <Doughnut
          data={{
            labels: labels,
            datasets: [
              {
                backgroundColor: colors,
                borderWidth: 4,
                data: data
              }
            ]
          }}
          width={"100%"}
          height={"100%"}
          options={{ maintainAspectRatio: true, cutoutPercentage: 70 }}
        />
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(IncomeCard);
