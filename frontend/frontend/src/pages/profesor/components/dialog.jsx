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
import { createNotification } from "../../../actions/proffesorActions";
import { connect } from "react-redux";
import "./dialog.css";

const styles = theme => ({
  root: {
    overflow: "hidden"
  },
  mutton: {
    overflowX: "hidden",
    display: "block",
    background: "linear-gradient(135deg, #C33764 0%, #252E73 100%)",
    color: "white",
    webkit_scrollbar: {
      display: "none"
    },
    height: "100%",
    position: "sticky",
    clear: "left",
    zIndex: 100000,
  },
  dialog: { 
    zIndex: 1000000
  }
});

class CreateNotificationDialog extends Component {
  state = {
    open: false,
    title: "",
    description: ""
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    let newState = { ...this.state };
    newState.open = false;
    this.setState(newState);
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitNotification = () => {
    let { dispatch, gradeId } = this.props;
    let { title, description } = this.state;
    dispatch(createNotification(title, description, gradeId));
    console.log(this.state);
    this.setState({ open: false });
    this.handleClose();
    console.log(this.state);
    console.log(this.state);
    console.log(this.state);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          color="white"
          label="Nova poruka"
          onClick={this.handleClickOpen}
          className={classes.mutton}
        >
          <AddIcon />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          className={classes.dialog}
          classes={{ paper: classes.dialog }}
        >
          <DialogTitle id="form-dialog-title">Nova obavijest</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Pošaljite obavijest razredima kojim predajete.
            </DialogContentText>
            <TextField
              autoFocus
              id="text"
              label="Naslov"
              type="text"
              name="title"
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              autoFocus
              id="text"
              name="description"
              onChange={this.handleChange}
              label="Poruka"
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            {/* <FormControlLabel
              control={<Checkbox value="checkedC" color="secondary" />}
              label="Važno"
            /> */}
            <Button variant="contained" onClick={this.handleClose} color="secondary">
              Odustani
            </Button>
            <Button variant="contained" onClick={this.submitNotification} color="primary">
              Pošalji
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect()(withStyles(styles)(CreateNotificationDialog));
