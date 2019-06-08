import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  IconButton,
  Card,
  CardContent,
  CardHeader,
  Typography
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import { Error } from "@material-ui/icons/";
import { connect } from "react-redux";
import { unexpectedOutcome } from "../actions/studentActions";

const styles = theme => ({
  dialogfix: {
    overflowX: "hidden",
    overflowY: "hidden"
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
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
    width: "40%",
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
    position: "absolute",
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
    display: "flex"
  },
  card: {
    width: "60%",
    paddingTop: 15
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

class FinPlanChoice extends Component {
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

  progress = () => {
    let { studentId, variant } = this.props;
    let outcome = variant == 2 ? 7200 : 5600;
    let duration = variant == 2 ? 5 : 4;

    this.props.dispatch(unexpectedOutcome(studentId, outcome, duration));
    this.handleClose();
  };

  render() {
    const { classes, variant } = this.props;
    return (
      <div>
        <IconButton
          onClick={this.handleClickListItem}
          className={classes.iconButton}
          color={"secondary"}
          ripp
        >
          <Error />
        </IconButton>
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
            <Card className={classes.card}>
              <CardHeader
                title={
                  <div>
                    <div style={{ fontSize: 30 }}>
                      Došlo je do neplaniranog jednokratnog rashoda !
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
                <Typography style={{ fontSize: 20 }} variant={"body1"}>
                  Morate otići zubaru i svog kućnog ljubimca odvesti veterinaru
                  što zajedno košta {variant == 2 ? "7.200,00" : "5.760,00"}
                  HRK. Taj iznos možete otplaćivati u mjesečnim ratama sljedeće
                  {variant == 2 ? "5" : "4"} godine bez kamata. Mjesečni iznos
                  rate iznosi 120 HRK. Vaša tablica prihoda i rashoda se mijenja
                  i prikazana je gore. Vaš saldo mjesečnih prihoda i rashoda je
                  sada u još većem minusu i morate poduzeti daljnje korake kako
                  biste pokrili svoje mjesečne izdatke. Istovremeno se mijenja i
                  projekcija vašeg financijskog stanja nakon 1 godine. Uz
                  kredit, morate vratiti i troškove neplaniranih rashoda.
                  <br />
                  <br />
                </Typography>
                <Button
                  onClick={this.progress}
                  variant={"contained"}
                  color="secondary"
                >
                  Prihvati
                </Button>
              </CardContent>
            </Card>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect()(withStyles(styles)(FinPlanChoice));
