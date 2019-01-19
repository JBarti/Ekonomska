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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import AddUserIcon from "@material-ui/icons/PersonAdd";
import ListButton from "../../../common/list-button/listButton";

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
  }
});
function Choice(props) {
  const whatIsChosen = props.whatIsChosen;
  if (whatIsChosen == "Test") {
    return (
      <div>
        {" "}
        <TextField style={{ width: 400 }} id="text" label="Naziv" type="text" />
      </div>
    );
  } else if (whatIsChosen == "PDF" || whatIsChosen == "Word") {
    return (
      <div>
        {" "}
        <TextField style={{ width: 400 }} id="text" label="Naziv" type="text" />
        <TextField style={{ width: 400 }} id="text" label="Link" type="text" />
      </div>
    );
  }
  return <div />;
}

class addNewDialog extends Component {
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
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <ListButton
          onClick={this.handleClickOpen}
          iconColor="white"
          icon={<AddUserIcon />}
          primary="Novi učenik"
        />

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          className={classes.dialog}
          fullWidth
          scroll="paper"
        >
          <DialogTitle id="form-dialog-title">Novo</DialogTitle>
          <DialogContent>
            <DialogContentText>Odaberite što želite dodati:</DialogContentText>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                aria-label="dodaj"
                name="Dodaj"
                className={classes.group}
                value={this.state.value}
                onChange={this.handleChange}
              >
                <FormControlLabel value="PDF" control={<Radio />} label="PDF" />
                <FormControlLabel
                  value="Word"
                  control={<Radio />}
                  label="Word"
                />
                <FormControlLabel
                  value="Test"
                  control={<Radio />}
                  label="Test"
                />
              </RadioGroup>
            </FormControl>
            <Choice whatIsChosen={this.state.value} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onClose} color="secondary">
              Odustani
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Dodaj
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(addNewDialog);
