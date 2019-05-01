import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  IconButton,
  Card,
  CardContent,
  CardHeader,
  Typography,
  CardMedia
} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Error } from "@material-ui/icons/";
import graphicDesignImage from "../images/grafickiDesign.png";

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
    flexDirection: "column",
    height: "40%",
    width: "60%",
    marginTop: 15
  },
  selectionCard: {
    marginRight: 15,
    width: "82%",
    display: "flex",
    flexDirection: "row"
  },
  selectionCardText: {
    marginLeft: 15,
    marginTop: 15
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

const selectionCard = () => {};

class finPlanChoice extends Component {
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

  render() {
    const { classes } = this.props;
    const { value, ...other } = this.props;
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
              <Card className={classes.selectionCard}>
                <CardMedia
                  style={{ height: "100%", width: "20%" }}
                  image={graphicDesignImage}
                />
                <div className={classes.selectionCardText}>
                  <Typography variant={"headline"}>Graficki dizajn</Typography>
                  <Typography variant={"subheading"}>
                    Vaš poslodavac oduševljen je odlukom i vašu plaću će
                    postaviti na 5.500 HRK
                  </Typography>
                  <Typography variant={"subheading"}>
                    Cijena tečaja: 25.000 HRK
                  </Typography>
                  <Typography
                    variant={"caption"}
                    style={{ marginTop: 15, fontSize: 15 }}
                  >
                    S obzirom da još nemate novca prisiljeni ste podignuti
                    kredit. Njega otplačujete 4 godine svaki mjesec uz kamatnu
                    stopu 4%.
                  </Typography>
                </div>
              </Card>
              <Card className={classes.selectionCard} />
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

export default withStyles(styles)(finPlanChoice);
