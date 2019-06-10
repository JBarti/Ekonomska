import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { updateFolder } from "../actions/proffesorActions";
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
  }
});

class editLekcija extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      name: props.folder.name
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true, name: this.props.folder.name });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitChange = () => {
    let { dispatch } = this.props;
    dispatch(updateFolder(this.props.folder.id, this.state.name));
    this.handleClose();
    this.props.reload();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          className={classes.deleteBtn}
          onClick={this.handleClickOpen}
          aria-label="Edit"
        >
          <EditIcon />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          className={classes.dialog}
          fullWidth
          scroll="paper"
        >
          <DialogTitle id="form-dialog-title">Uredite lekciju </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              id="text"
              label="Novi naziv"
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClose}
              variant="contained"
              color="secondary"
            >
              Odustani
            </Button>

            <Button
              onClick={this.submitChange}
              variant="contained"
              color="primary"
            >
              Potvrdi
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect()(withStyles(styles)(editLekcija));
