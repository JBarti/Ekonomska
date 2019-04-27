import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ContentCard from "../../../common/content-card/contentCard";
import { Button } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const styles = theme => ({
  dialogfix: {
    overflowX: "hidden",
    overflowY: "hidden"
  },
  fpSubmitBtn: {
    position: "absolute",
    right: 10,
    top: 7
  }
});

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

  handleEntering = () => {
    this.radioGroupRef.focus();
  };

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
        <Button
          className={classes.fpSubmitBtn}
          variant="contained"
          color="secondary"
          onClick={this.handleClickListItem}
        >
          {" "}
          Novi odabir
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
          fullWidth
        >
          <DialogTitle id="confirmation-dialog-title">
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

              <FormControlLabel
                value={3}
                control={<Radio />}
                label="3.	Procijenili ste da biste svoje slobodno vrijeme mogli iskoristiti za dodatnu zaradu
                 i to obavljanjem usluge prijevoza (Uber). U tu svrhu morate kupiti novi automobil. Cijena novog
                 automobila je 120.000,00 HRK, a obavljanjem usluga prijevoza možete zaraditi dodatnih 1.000,00 HRK
                 mjesečno. Za kupnju automobila morate podignuti kredit kojeg ćete otplaćivati kroz 5 
                 godina uz kamatnu stopu od 6% mjesečno"
              />
              <br />
            </RadioGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" variant="raised">
              Spremi
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(finPlanChoice);
