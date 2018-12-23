import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "./dialog.css";
const styles = theme => ({
  root: {
    overflow: "hidden"
  },
  mutton: {
    overflowX: "hidden",
    position: "absolute",
    top: 35,
    right: 100,
    zIndex: 25
  }
});

class Dijalog extends Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: !this.state.open });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { classes } = this.props;
    return (
      <Button
        color="primary"
        label="Nova poruka"
        onClick={this.handleClickOpen}
        className={classes.mutton}
      >
        <AddIcon />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          className={classes.dialog}
          fullWidth
          scroll="paper"
        >
          <DialogTitle id="form-dialog-title">Nova obavijest</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Pošaljite obavijest razredima kojim predajete. Napomena, ako ne
              označite da je važna obavijest, poslat će se kao obična.
            </DialogContentText>
            <TextField
              autoFocus
              id="text"
              label="Poruka"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <FormControlLabel
              control={<Checkbox value="checkedC" color="secondary" />}
              label="Vazno"
            />
            <Button onClick={this.handleClose} color="secondary">
              Odustani
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Pošalji
            </Button>
          </DialogActions>
        </Dialog>
      </Button>
    );
  }
}

export default withStyles(styles)(Dijalog);
