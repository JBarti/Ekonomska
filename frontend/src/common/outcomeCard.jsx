import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import FinPlanChoice from "./finPlanChoice";
import UnexpectedOutcome from "./unexpectedOutcome";
import FinanceInvestment from "./financeInvestment";
import {
  Card,
  CardContent,
  CardHeader,
  List,
  Divider,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Button
} from "@material-ui/core";
import { grey, red, blue, green } from "@material-ui/core/colors";
import {
  HomeOutlined,
  CakeOutlined,
  RestaurantOutlined,
  LocalCafeOutlined,
  LocalTaxiOutlined,
  CreditCardOutlined,
  ShoppingCartOutlined,
  LocalCarWashOutlined,
  WarningOutlined,
  KeyboardArrowLeft,
  KeyboardArrowRight
} from "@material-ui/icons";
import { updateOutcomes } from "../actions/studentActions";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    width: "40%",
    marginLeft: 10,
    overflowY: "auto",
    overflowX: "hidden"
  },
  cardContent: {
    paddingTop: 0
  },
  primary: {
    display: "flex",
    width: "42%",
    flexDirection: "row",
    justifyContent: "center"
  },
  sliderContainer: {
    display: "flex",
    flexDirection: "row",
    width: "50%"
  },
  slider: {
    "-webkit-appearance": "none",
    outline: "none",
    width: "100%",
    height: 9,
    borderRadius: 20,
    background: "#8f94fb",
    marginTop: 5,
    transition: "background .2s",
    "&::-moz-focus-outer": {
      border: 0
    },
    "&:hover": {
      "&::-moz-range-thumb": {
        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75);"
      }
    },
    "&::-moz-range-thumb": {
      width: 25,
      height: 25,
      border: "none",
      borderRadius: 1000,
      background: "#8f94fb",
      boxShadow: "0px 0px 5px -2px rgba(0,0,0,0.65);",
      transition: "box-shadow .2s"
    },
    "&:disabled": {
      background: theme.palette.grey[500],
      "&::-moz-range-thumb": {
        background: theme.palette.grey[500],
        boxShadow: "0px 0px 5px -2px rgba(0,0,0,0.75);"
      },
      "&:hover": {
        "&::-moz-range-thumb": {
          boxShadow: "0px 0px 5px -2px rgba(0,0,0,0.65);"
        }
      }
    }
  },
  sliderTagNegative: {
    marginRight: 12,
    color: red[600]
  },
  sliderTagPositive: {
    marginLeft: 12,
    color: blue[600]
  },
  amount: {
    borderBottom: `3px ${red[500]} solid`,
    paddingRight: 4,
    paddingLeft: 4,
    marginRight: "10%",
    transition: "border-bottom-color .5s"
  }
});

const GetOutcomeIcon = type => {
  switch (type) {
    case "Hrana":
      return <RestaurantOutlined />;
    case "Režije":
      return <HomeOutlined />;
    case "Potrepštine":
      return <ShoppingCartOutlined />;
    case "Zabava":
      return <CakeOutlined />;
    case "Higijena":
      return <LocalCarWashOutlined />;
    case "Kava":
      return <LocalCafeOutlined />;
    case "Prijevoz":
      return <LocalTaxiOutlined />;
    case "Kredit":
      return <CreditCardOutlined />;
    case "Neočekivano":
      return <WarningOutlined />;
  }
};

const OutcomeListItem = props => {
  let { classes, onChange, amount, name, primary } = props;
  let { total, change } = amount;
  let amountColor = blue[500];
  if (change < 0) {
    amountColor = red[500];
  } else if (change > 0) {
    amountColor = green[500];
  }

  return (
    <ListItem>
      <ListItemIcon>{GetOutcomeIcon(primary)}</ListItemIcon>
      <ListItemText
        primary={
          <div className={classes.primary}>
            <span style={{ width: "100%" }}>{primary}</span>
            <span
              className={classes.amount}
              style={{ borderBottomColor: amountColor }}
            >
              {Number(total) + Number(change === undefined ? 0 : change)}kn
            </span>
          </div>
        }
      />
      <ListItemSecondaryAction className={classes.sliderContainer}>
        <span className={classes.sliderTagNegative}>-30</span>
        <input
          disabled={change === undefined || change === null}
          name={name}
          type="range"
          min={-30}
          max={30}
          className={classes.slider}
          defaultValue={0}
          value={change}
          onChange={onChange}
        />
        <span className={classes.sliderTagPositive}>+30</span>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

class OutcomeCard extends Component {
  constructor(props) {
    super(props);
    this.state = { displayedYear: 1 };
  }

  yearIsEmpty = (year, outcomes) => {
    return !Boolean(outcomes.find(outcome => outcome.type === year));
  };

  updateOutcomes = () => {
    let { outcomes, studentId, dispatch } = this.props;
    dispatch(updateOutcomes(studentId, outcomes));
  };

  render() {
    let { classes, outcomes, sliderChange, financialYear } = this.props;
    let { displayedYear } = this.state;

    let displayedOutcomes = outcomes.filter(outcome => {
      return (
        outcome.duration === null ||
        (outcome.duration + outcome.year > displayedYear &&
          outcome.year <= displayedYear) ||
        outcome.year === displayedYear
      );
    });

    let choices = [];
    if (financialYear >= 1 && this.yearIsEmpty("Kredit", outcomes)) {
      choices.push(<FinPlanChoice studentId={this.props.studentId} />);
      console.log("KREDIT");
    }
    if (financialYear >= 2 && this.yearIsEmpty("Neočekivano", outcomes)) {
      choices.push(
        <UnexpectedOutcome
          studentId={this.props.studentId}
          variant={this.props.variant}
        />
      );
      console.log("NEOCEKIVANo");
      console.log(choices);
    }
    if (financialYear >= 3 && !this.props.saving)
      choices.push(
        <FinanceInvestment
          studentId={this.props.studentId}
          variant={this.props.variant}
          outcomes={this.props.outcomes}
          incomes={this.props.incomes}
        />
      );
    return (
      <Card elevation={5} className={classes.root}>
        <CardHeader
          title={"Rashodi"}
          action={
            <div style={{ height: 20 }}>
              <Button variant="outlined" onClick={this.updateOutcomes}>
                Pohrani
              </Button>

              <span
                onClick={
                  displayedYear > 1
                    ? () => {
                        this.setState({ displayedYear: displayedYear - 1 });
                      }
                    : () => {
                        console.log("NON");
                      }
                }
              >
                <IconButton disabled={displayedYear === 1}>
                  <KeyboardArrowLeft />
                </IconButton>
              </span>
              <Typography
                variant={"subheading"}
                style={{ display: "inline", marginRight: 20 }}
              >
                Godina: {Number(displayedYear)}
              </Typography>
              <span
                onClick={
                  displayedYear < 7
                    ? () => {
                        this.setState({ displayedYear: displayedYear + 1 });
                      }
                    : () => {
                        console.log("NON");
                      }
                }
              >
                <IconButton disabled={displayedYear >= 7}>
                  <KeyboardArrowRight />
                </IconButton>
              </span>
            </div>
          }
        />
        <Divider />
        <CardContent className={classes.cardContent}>
          {choices.shift()}
          <List>
            {displayedOutcomes.map((outcome, index) => {
              let { type, amount, change } = outcome;
              return (
                <div>
                  <OutcomeListItem
                    name={outcome.id}
                    primary={type}
                    classes={classes}
                    amount={{ total: amount, change: change }}
                    onChange={sliderChange}
                  />
                  <Divider />
                </div>
              );
            })}
          </List>
        </CardContent>
      </Card>
    );
  }
}

export default connect()(withStyles(styles)(OutcomeCard));
