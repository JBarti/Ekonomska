import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  IconButton,
  Card,
  CardContent,
  CardHeader,
  Typography,
  CardMedia,
  CardActions
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { Error } from "@material-ui/icons/";
import graphicDesignImage from "../images/grafickiDesign.png";
import schoolImage from "../images/collage.png";
import { connect } from "react-redux";
import { newInvestment } from "../actions/studentActions";

const styles = theme => ({
  dialogfix: {
    overflowX: "hidden"
  },
  cardContainer: {
    marginLeft: "20%",
    marginRight: "20%",
    width: "100%",
    zIndex: 1
  },
  selectionContainer: {
    display: "flex",
    flexDirection: "row",
    height: "45%",
    width: "60%",
    marginTop: 15
  },
  selectionCard: {
    marginRight: 15,
    width: "52%",
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },

  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  iconButton: {
    marginBottom: -10,
    marginRight: 5
  },
  background: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "#4e54c8"
  },
  backgroundLight: {
    position: "absolute",
    top: "-17%",
    left: "-8%",
    width: "110%",
    height: "60vh",
    backgroundColor: "#8f94fb",
    transform: "rotate(-10deg)",
    "-webkit-box-shadow": "2px 10px 5px 0px rgba(0,0,0,0.45)",
    "-moz-box-shadow": "2px 10px 5px 0px rgba(0,0,0,0.45)",
    "box-shadow": "2px 10px 5px 0px rgba(0,0,0,0.45)"
  },
  dialog: {
    display: "flex",
    marginTop: 100
  },
  card: {
    width: "60%",
    paddingTop: 15,
    overflow: "unset"
  },
  dotContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row"
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 1000,
    backgroundColor: theme.palette.grey[400],
    marginRight: 10
  }
});

const SelectionCard = props => {
  let {
    image,
    title,
    primaryText,
    priceText,
    secondaryText,
    classes,
    onClick
  } = props;
  return (
    <Card className={classes.selectionCard}>
      <CardMedia style={{ height: 400 }} image={image} />
      <CardContent style={{ paddingTop: 20 }}>
        <Typography style={{ paddingTop: 5 }} variant={"headline"}>
          {title}
        </Typography>
        <Typography style={{ paddingTop: 5 }} variant={"subheading"}>
          {primaryText}
        </Typography>
        <Typography style={{ paddingTop: 5 }} variant={"subheading"}>
          {priceText}
        </Typography>
        <Typography style={{ paddingTop: 5 }} variant={"caption"}>
          {secondaryText}
        </Typography>
      </CardContent>

      <CardActions>
        <Button onClick={onClick} variant={"contained"} color={"secondary"}>
          Odaberi
        </Button>
      </CardActions>
    </Card>
  );
};

class FinanceInvestment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      open: true
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleClickListItem = () => {
    this.setState({ open: true });
  };

  handleClose = value => {
    this.setState({ value, open: false });
  };

  getSavings = () => {
    let totalIncome = this.props.incomes
      .map(income => income.amount)
      .reduce((prev, next) => prev + next, 0);

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

    let years = 6;

    let savings =
      totalIncome * years -
      [...Array(years).keys()]
        .map(year => {
          return totalOutcome(this.props.outcomes, year + 1);
        })
        .reduce((prev, next) => {
          return prev + next;
        }, 0);

    savings *= 12;
    console.log("SEJVINGS", savings);
    return savings;
  };

  selectInvestment = interestRate => () => {
    let savings = this.getSavings();
    console.log("SAVINGS", savings);
    this.handleClose();
    this.props.dispatch(
      newInvestment(this.props.studentId, savings, interestRate)
    );
  };

  canInvest = () => {
    let totalIncome = this.props.incomes
      .map(income => income.amount)
      .reduce((prev, next) => prev + next, 0);

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

    let years = 7;

    let savings =
      totalIncome * years -
      [...Array(years).keys()]
        .map(year => {
          return totalOutcome(this.props.outcomes, year + 1);
        })
        .reduce((prev, next) => {
          return prev + next;
        }, 0);

    savings *= 12;
    return savings > 0;
  };

  render() {
    const { classes } = this.props;
    let canInvest = this.canInvest();
    return (
      <div>
        <Button
          onClick={this.handleClickListItem}
          className={classes.iconButton}
          color={"secondary"}
        >
          <Error />
        </Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          maxWidth="l"
          onEntering={this.handleEntering}
          open={this.state.open}
          onClose={this.handleClose}
          scroll="paper"
          aria-labelledby="confirmation-dialog-title"
          classes={{ paper: classes.dialogfix }}
          className={classes.dialog}
          fullScreen
        >
          <div className={classes.background}>
            <div className={classes.backgroundLight} />
          </div>
          <div className={classes.cardContainer}>
            <Card classes={{ root: classes.card }} className={classes.card}>
              <CardHeader
                title={
                  <div>
                    <div style={{ fontSize: 30 }}>
                      Čestitam! Završili ste s programom financijske pismenosti.
                    </div>
                    <div className={classes.dotContainer}>
                      <div className={classes.dot} />
                      <div className={classes.dot} />
                      <div className={classes.dot} />
                    </div>
                  </div>
                }
              />
              <CardContent>
                {canInvest ? (
                  <Typography style={{ fontSize: 20 }} variant={"body1"}>
                    Rješili ste se svih troškova i izvukli se iz minusa. Sada
                    kada imate određenu količinu mjesečne ušteđevine i možete je
                    uložiti u jedan od idućih opcija investicije novca kako bi
                    ostvarili vaš financijski cilj. Birajte pametno, ovaj korak
                    odlučit će o završnom ishodu vaših financija.
                    <br />
                    <br />
                    <div
                      style={{ borderTop: "2px #4e54c8 solid", paddingTop: 5 }}
                    >
                      Vaš posljednji zadatak je odabrati investiciju:
                    </div>
                  </Typography>
                ) : (
                  <Typography style={{ fontSize: 20 }} variant={"body1"}>
                    Na žalost niste se uspjeli riješiti prevelikih troškova, a
                    vaše financijsko stanje iz godine u godinu je sve gore.
                    Niste u mogućnosti ulagati u nikakve obveznice, pa stoga ne
                    možete doseći ni svoj finalni cilj kupnju laptopa.
                  </Typography>
                )}
              </CardContent>
              {!canInvest ? (
                <CardActions>
                  <Button
                    variant={"contained"}
                    color={"secondary"}
                    onClick={this.selectInvestment(0)}
                  >
                    Prihvati
                  </Button>
                </CardActions>
              ) : (
                <div />
              )}
            </Card>

            {canInvest ? (
              <div className={classes.selectionContainer}>
                <SelectionCard
                  classes={classes}
                  image={graphicDesignImage}
                  title={"Oročena štednja"}
                  onClick={this.selectInvestment(0.5)}
                  primaryText={
                    "Odlučili ste nakon dvije godine svoju ušteđevinu uložiti na banku kao oročenu štednju."
                  }
                  secondaryText={"Vaša kamatna stopa iznosi 0,5%."}
                />
                <SelectionCard
                  classes={classes}
                  image={schoolImage}
                  title={"Ulaganje u investicijski fond"}
                  onClick={this.selectInvestment(4)}
                  primaryText={
                    "Svoju ušteđevinu odlučili ste uložiti u investicijski fond. To je jako rizično ulaganje i očekivan povrat nemora se uvijek ostvariti."
                  }
                  secondaryText={"Očekivani povrati iznosi 8%"}
                />
                <SelectionCard
                  classes={classes}
                  image={schoolImage}
                  title={"Ulaganje u obveznice"}
                  onClick={this.selectInvestment(6)}
                  primaryText={
                    "Odlučili ste svoju ušteđevinu staviti u državne obveznice. Maksimalni povrat je manji nego kod ulaganja u investicijski fond, ali nemate rizik od gubljenja novca."
                  }
                  secondaryText={"Sigurni povrat iznosi 6%"}
                />
              </div>
            ) : (
              <div />
            )}
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect()(withStyles(styles)(FinanceInvestment));
