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
import { newJob } from "../actions/studentActions";

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
    onSelect,
    classes,
    onClick
  } = props;
  return (
    <Card className={classes.selectionCard}>
      <CardMedia style={{ height: 500 }} image={image} />
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

  createJob = (jobName, jobPayment, jobCredit) => () => {
    let studentId = this.props.studentId;
    this.props.dispatch(newJob(jobName, jobPayment, jobCredit, studentId));
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          onClick={this.handleClickListItem}
          className={classes.iconButton}
          color={"secondary"}
          ripp
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
                      Nakon završenog školovanja dobili ste svoj prvi posao.
                      Čestitamo!
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
                  To znači da sada imate svoje vlastite prihode s kojima možete
                  upravljati! Na zaslonu prikazani su vaši mjesečni prihodi i
                  rashodi. Vaš cilj je nakon 5 godina ostvariti dovoljnu uštedu
                  da si priuštite kupnju kvalitetnog laptopa. Na tom putu
                  očekuju vas financijski usponi i padovi. Stoga upravljajte
                  mudro svojim novcem! Sretno!
                  <br />
                  <br />
                  <div
                    style={{ borderTop: "2px #4e54c8 solid", paddingTop: 5 }}
                  >
                    Prvi zadatak vam je odabrati glavni glavni životni put:
                  </div>
                </Typography>
              </CardContent>
            </Card>
            <div className={classes.selectionContainer}>
              <SelectionCard
                onClick={this.createJob("Grafički dizajn", 5500, 640)}
                classes={classes}
                image={graphicDesignImage}
                title={"Upis tečaj grafičkog dizajna"}
                primaryText={
                  "Vaš poslodavac oduševljen je odlukom i vašu plaću će postaviti na 5.500 HRK"
                }
                secondaryText={
                  "S obzirom da još nemate novca prisiljeni ste podignuti kredit za tečaj. Njega otplačujete 4 godine svaki mjesec uz kamatnu stopu 4%."
                }
                priceText={"Cijena tečaja: 25.000 HRK"}
              />
              <SelectionCard
                onClick={this.createJob("Školovanje", 7500, 2348)}
                classes={classes}
                image={schoolImage}
                title={"Nastavak školovanja uz rad"}
                primaryText={
                  "Vaš poslodavac smatra da obrazovaniji zaposlenici pridonose razvoju tvrtke. Kao poticaj vam je plaća povečana na 7500 HRK."
                }
                secondaryText={
                  "S obzirom da još nemate novca prisiljeni ste podignuti kredit. Njega otplačujete 5 godine svaki mjesec uz kamatnu stopu 5%."
                }
                priceText={"Cijena studija: 100.000 HRK."}
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default connect()(withStyles(styles)(FinPlanChoice));
