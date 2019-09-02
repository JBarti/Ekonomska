import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  CardMedia
} from "@material-ui/core";
import { grey, red, green } from "@material-ui/core/colors";
import laptop from "../images/laptop.png";
import laptopNo from "../images/laptopNo.png";
import sadFace from "../images/sad.png";

const styles = theme => ({
  root: {
    width: "20%",
    marginLeft: 10,
    overflowY: "hidden"
  },
  cardContent: {
    padding: 0,
    height: "100%",
    display: "flex",
    flexDirection: "column",

    alignItems: "center"
  },
  cardText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
});

let totalOutcome = (outcomes, year) => {
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

const GoalsFulfilledCard = props => {
  let { classes, saving, outcomes, incomes } = props;

  let totalIncome = incomes
    .map(income => income.amount)
    .reduce((prev, next) => prev + next, 0);

  let stabileDifference =
    incomes
      .map(income => income.amount)
      .reduce((prev, next) => prev + next, 0) -
    outcomes
      .filter(outcome => outcome.year === 7)
      .map(
        outcome =>
          outcome.amount +
          (outcome.change === undefined ? 0 : Number(outcome.change))
      )
      .reduce((prev, next) => prev + next, 0);

  let savings =
    totalIncome * 7 -
    [...Array(7).keys()]
      .map(year => {
        return totalOutcome(outcomes, year + 1);
      })
      .reduce((prev, next) => {
        return prev + next;
      }, 0);

  let didBuyLaptop = totalSavings => {
    if (totalSavings < 4400) {
      return (
        <div style={{ fontSize: 20, color: red[500] }}>
          Niste uspjeli kupiti laptop.
        </div>
      );
    }
    return (
      <div style={{ fontSize: 20, color: green[500] }}>
        Uspjeli ste kupiti laptop!
      </div>
    );
  };

  let didInvest = !(saving.amount === 0 && saving.year === 0);

  return (
    <Card elevation={5} className={classes.root}>
      <CardHeader title={`Konačni rezultat`} />
      <Divider />
      {didInvest ? (
        <CardContent className={classes.cardContent}>
          <CardMedia
            style={{ width: 200, height: 200, marginTop: 20, marginBottom: 20 }}
            image={savings + stabileDifference * 2 < 4400 ? laptopNo : laptop}
          />
          <div className={classes.cardText}>
            <div style={{ fontSize: 20, color: grey[700] }}>
              Uložili ste: {savings * 12}kn
            </div>
            <br />
            <div style={{ fontSize: 20, color: grey[700] }}>
              Ostvareni dobitak: {savings + stabileDifference * 2}kn
            </div>
            <br />
            <div style={{ fontSize: 20, color: grey[700] }}>
              Ukupan iznos: {saving.amount - savings}kn
            </div>
            <br />
            {didBuyLaptop(savings + stabileDifference * 2)}
          </div>
        </CardContent>
      ) : (
        <CardContent className={classes.cardContent}>
          <CardMedia
            style={{ width: 200, height: 200, marginTop: 20, marginBottom: 20 }}
            image={sadFace}
          />
          <div className={classes.cardText}>{didBuyLaptop(0)}</div>
        </CardContent>
      )}
    </Card>
  );
};

export default withStyles(styles)(GoalsFulfilledCard);
