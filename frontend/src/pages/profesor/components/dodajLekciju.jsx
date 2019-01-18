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
import ContentCard from "../../../common/content-card/contentCard";
import "./dialog.css";
const styles = theme => ({
  dialogContent: {
    overflowX: "hidden"
  },
  mutton: {
    marginTop: 10,
    overflowX: "hidden",
    background: "linear-gradient(135deg, #C33764 0%, #252E73 100%)",
    color: "white",
    width: 280,
    height: "100%",
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);",
    marginRight: "20px"
  },
  textField: {
    height: 50
  }
});

class DodajLekciju extends Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
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
          fullWidth
          scroll="paper"
        >
          <DialogTitle id="form-dialog-title">Nova Lekcija</DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <TextField
              autoFocus
              id="text"
              label="Naslov"
              type="text"
              fullWidth
            />
            <TextField
              label="Opis"
              multiline
              rowsMax="9"
              value={this.state.multiline}
              onChange={this.handleChange("multiline")}
              className={classes.textField}
              margin="normal"
              fullWidth
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
              onClick={this.handleClose}
              variant="contained"
              color="primary"
            >
              Dodaj lekciju
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(DodajLekciju);
