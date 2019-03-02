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
import IconButton from "@material-ui/core/IconButton";
import { addGrade } from "../../../actions/proffesorActions";
import { connect } from "react-redux";

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
  checkVid: {
    float: "left"
  },
  addClassBtn: {
    position: "absolute",
    right: 10,
    top: 0
  }
});

class addNewClass extends Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = event => {
    console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  createNewClass = () => {
    let { dispatch, proffesorId } = this.props;
    let name = this.state.value;
    console.log(name, proffesorId);
    dispatch(addGrade(name, proffesorId));
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.addClassBtn}>
        <IconButton onClick={this.handleClickOpen}>
          <AddIcon />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          className={classes.dialog}
          fullWidth
          scroll="paper"
        >
          <DialogTitle id="form-dialog-title">Dodajte razred: </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              id="text"
              label="Naziv"
              type="text"
              name="value"
              onChange={this.handleChange}
              value={this.state.value}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Odustani
            </Button>

            <Button onClick={this.createNewClass} color="primary">
              Dodaj
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect(store => {
  return {
    proffesorId: store.proffesor.id,
    all: store.grades.all
  };
})(withStyles(styles)(addNewClass));
