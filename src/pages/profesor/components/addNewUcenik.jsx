import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import { connect } from "react-redux";
import { addStudent } from "../../../actions/proffesorActions";

const styles = theme => ({
  root: {
    overflow: "hidden"
  },
  mutton: {
    overflowX: "hidden",
    display: "flex",
    background: "linear-gradient(135deg, #C33764 0%, #252E73 100%)",
    color: "white"
  },
  tfield: {
    width: 400,
    marginLeft: 20
  },
  formControl: {
    float: "left"
  },
  dialog: {
    position: "initial",
    zIndex: 1000000
  },
  btnNew: {
    color: "white"
  }
});

class addNewUcenik extends Component {
  state = {
    open: false,
    ucenik: {}
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = event => {
    console.log(event.target.value);
    let ucenik = { ...this.state.ucenik };
    ucenik[event.target.name] = event.target.value;
    this.setState({ ucenik });
  };
  addNewUcenik = event => {
    let { dispatch, gradeId } = this.props;
    console.log(this.state.ucenik);
    console.log("DEJTA");
    console.log(gradeId);
    dispatch(addStudent(this.state.ucenik, gradeId));
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <ListItem button onClick={this.handleClickOpen}>
          <ListItemText> <span className={classes.btnNew}>Novo</span></ListItemText>
        </ListItem>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          className={classes.dialog}
          classes={{ paper: classes.dialog }}
        >
          <DialogTitle id="form-dialog-title">Novi učenik</DialogTitle>
          <DialogContent>
            <DialogContentText>Upišite podatke:</DialogContentText>
            <TextField
              style={{ width: 175, marginTop: 10 }}
              id="text"
              label="Ime"
              type="text"
              name="firstName"
              value={this.state.ucenik.firstName}
              onChange={this.handleChange}
            />
            <TextField
              style={{ width: 175, marginTop: 10 }}
              id="text"
              label="Prezime"
              type="text"
              name="lastName"
              value={this.state.ucenik.lastName}
              onChange={this.handleChange}
            />
            <TextField
              style={{ width: 400, marginTop: 10 }}
              id="text"
              label="Korisničko ime"
              type="text"
              name="email"
              value={this.state.ucenik.email}
              onChange={this.handleChange}
            />
            <TextField
              style={{ width: 400, marginTop: 10 }}
              id="text"
              label="Zaporka"
              type="text"
              name="password"
              value={this.state.ucenik.password}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} variant="contained" color="secondary">
              Odustani
            </Button>
            <Button onClick={this.addNewUcenik} variant="contained" color="primary">
              Dodaj
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect()(withStyles(styles)(addNewUcenik));
