import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import { addTest } from "../actions/proffesorActions";
import { connect } from "react-redux";
import PdfIcon from "@material-ui/icons/PictureAsPdf";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import WordIcon from "@material-ui/icons/InsertDriveFile";

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
    zIndex: 1000000,
    minWidth: 600
  },
  icons: {
    transform: "translateY(5px)",
    marginRight: 10
  },
  btnNew: {
    color: "#fff"
  }
});

function Choice(props) {
  const { whatIsChosen, handleChange } = props;
  if (whatIsChosen == "Test") {
    return (
      <div>
        {" "}
        <TextField
          style={{ width: 400, marginLeft: 30 }}
          id="text"
          label="Naziv"
          type="text"
          name={"testName"}
          onChange={handleChange}
          value={this.state["testName"]}
        />
      </div>
    );
  } else if (whatIsChosen == "PDF" || whatIsChosen == "Word") {
    return (
      <div>
        {" "}
        <TextField
          style={{ width: 400, marginLeft: 30 }}
          id="text"
          label="Naziv"
          type="text"
        />
        <TextField
          style={{ width: 400, marginLeft: 30 }}
          id="text"
          label="Link"
          type="text"
        />
      </div>
    );
  }
  return <div />;
}

class addNewDialog extends Component {
  state = {
    open: false,
    value: "PDF"
  };

  Choice = Choice.bind(this);

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addNew = () => {
    let { value } = this.state;
    let { folderId } = this.props;
    switch (value) {
      case "Test":
        let { testName } = this.state;
        let { dispatch } = this.props;
        dispatch(addTest(folderId, { name: testName, active: true }));
    }
    this.handleClose();
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <ListItem button onClick={this.handleClickOpen}>
          <ListItemText classes={{root: classes.btnNew}}><span className={classes.btnNew}>Novo</span></ListItemText>
        </ListItem>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          className={classes.dialog}
          classes={{ paper: classes.dialog }}
        >
          <DialogTitle id="form-dialog-title" >Novo</DialogTitle>
          <DialogContent>
            <DialogContentText>Odaberite što želite dodati:</DialogContentText>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                aria-label="dodaj"
                name="value"
                className={classes.group}
                value={this.state.value}
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value="PDF"
                  control={<Radio />}
                  label={
                    <div>
                      <PdfIcon className={classes.icons} />
                      PDF
                    </div>
                  }
                />
                <FormControlLabel
                  value="Test"
                  control={<Radio />}
                  label={
                    <div>
                      <QuestionAnswerIcon className={classes.icons} />
                      Test
                    </div>
                  }
                />
              </RadioGroup>
            </FormControl>
            {this.Choice({
              whatIsChosen: this.state.value,
              handleChange: this.handleChange
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} variant="contained" color="secondary">
              Odustani
            </Button>
            <Button onClick={this.addNew} variant="contained" color="primary">
              Dodaj
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default connect()(withStyles(styles)(addNewDialog));
