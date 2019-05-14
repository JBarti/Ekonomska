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
    overflowX: "hidden",
    height: "-webkit-fill-aveliable"
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
    display: "flex"
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
      <CardMedia style={{ height: 200 }} image={image} />
      <CardContent>
        <Typography variant={"headline"}>{title}</Typography>
        <Typography variant={"subheading"} style={{ marginTop: 8 }}>
          {primaryText}
        </Typography>
        <Typography variant={"subheading"}>{priceText}</Typography>
        <Typography variant={"caption"} style={{ marginTop: 8, fontSize: 15 }}>
          {secondaryText}
        </Typography>
      </CardContent>

      <CardActions style={{ position: "relative", height: "15%" }}>
        <Button
          onClick={onClick}
          style={{ position: "absolute", bottom: 0 }}
          variant={"contained"}
          color={"secondary"}
        >
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
      value: props.value
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  // handleEntering = () => {
  //   this.radioGroupRef.focus();
  // };

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
                onClick={this.createJob(
                  "Graficki dizajn",
                  5500,
                  Math.round(25000 / 12)
                )}
                classes={classes}
                image={graphicDesignImage}
                title={"Grafički dizajn"}
                primaryText={
                  "Vaš poslodavac oduševljen je odlukom i vašu plaću će postaviti na 5.500 HRK"
                }
                secondaryText={
                  "S obzirom da još nemate novca prisiljeni ste podignuti kredit. Njega otplačujete 4 godine svaki mjesec uz kamatnu stopu 4%."
                }
                priceText={"Cijena tečaja: 25.000 HRK"}
              />
              <SelectionCard
                onClick={this.createJob(
                  "Školovanje",
                  7500,
                  Math.round(100000 / 12)
                )}
                classes={classes}
                image={schoolImage}
                title={"Nastaviti školovanje i raditi"}
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
          {/* <DialogTitle id="confirmation-dialog-title">
            Odaberite scenarij
          </DialogTitle>
          <DialogContent>
            <p>
              Nakon završenog školovanja dobili ste svoj prvi posao. Čestitamo!
              U gornjoj tablici nalaze se vaši mjesečni prihodi i rashodi. Vaš
              cilj je nakon 5 godina ostvariti dovoljnu uštedu da si priuštite
              kupnju moćnog laptopa i softvera za grafički i web dizajn. Na tom
              putu očekuju vas financijski usponi i padovi. Stoga upravljajte
              mudro svojim novcem! Sretno! Nakon određenog broja koraka morat
              ćete riješiti mali test. Svaki uspješno riješen test donosi vam
              dodatne prihode u obliku honorarnog posla. Krenimo!
            </p>
            <br />
            <br />
            <RadioGroup
              ref={ref => {
                this.radioGroupRef = ref;
              }}
              aria-label="Ringtone"
              name="ringtone"
              value={this.state.value}
              onChange={this.handleChange}
            >
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="1. Nudi vam se mogućnost upisa tečaja za grafički i web dizajn.
                Cijena tečaja je 25.000,00 HRK i ne postoji mogućnost obročnog
                plaćanja već je ukupnu cijenu tečaja potrebno uplatiti odmah i u
                cijelosti. Vaš poslodavac oduševljen je tom idejom jer će nova
                znanja i vještine koje ćete steći pohađanjem tečaja uvelike
                pridonijeti razvoju tvrtke u kojoj radite. Stoga je vaš
                poslodavac odlučio da će vam odmah po upisu tečaja povećati
                plaću na 5.500,00 HRK Budući da nemate još nikakvu
                ušteđevinu, prisiljeni ste podignuti kredit. Kredit se otplaćuje
                4 godine, otplata je svakog mjeseca i to uz kamatnu stopu od
                6%"
              />
              <br />

              <FormControlLabel
                value={2}
                control={<Radio />}
                label="2.	Procijenili ste da bi vam se nastavak školovanja dugoročno mogao
                 isplatiti. Odlučili ste upisati fakultet i studirati uz rad. Vaš poslodavac 
                slaže se s tom idejom jer smatra da obrazovaniji zaposlenici pridonose rastu i razvoju
                 tvrtke te vam je kao poticaj odmah po upisu studija odlučio povećati plaću na 7.500,00 HRK.
                Ukupna cijena studija za 5 godina je 100.000 HRK. Budući da nemate nikakvu ušteđevinu prisiljeni
               ste podignuti kredit kojeg ćete otplaćivati sljedećih 5 godina u mjesečnim ratama i to uz kamatu od 5%."
              />
              <br />
            </RadioGroup>
          </DialogContent> 
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" variant="raised">
              Spremi
            </Button>
            </DialogActions>*/}
        </Dialog>
      </div>
    );
  }
}

export default connect()(withStyles(styles)(FinPlanChoice));
