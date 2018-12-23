import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListButton from "../../../common/list-button/listButton";
import FileIcon from "@material-ui/icons/InsertDriveFile";
import TestIcon from "@material-ui/icons/QuestionAnswer";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ProffesorApi from "../../../data/apiController/proffesor";

const styles = theme => ({
  root: {
    paddingLeft: 5,
    paddingRight: 10,
    paddingBottom: 25
  },
  textField: {
    marginLeft: 10
  },
  submit: {
    marginTop: 25
  }
});

class StudentAdder extends Component {
  state = { firstName: "", lastName: "", email: "", password: "" };
  addStudent = () => {
    let { firstName, lastName, email, password } = this.state;
    this.props.addStudent(firstName, lastName, email, password);
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    });
    this.props.onClose();
    window.location.reload();
  };

  handleChange = name => ev => {
    this.setState({ [name]: ev.target.value });
  };
  render() {
    const { classes } = this.props;

    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <div className={classes.root}>
          <DialogTitle>Izradite novog ucenika</DialogTitle>
          <TextField
            className={classes.textField}
            value={this.state["fistName"]}
            onChange={this.handleChange("firstName")}
            label="ime"
          />
          <TextField
            className={classes.textField}
            value={this.state["lastName"]}
            onChange={this.handleChange("lastName")}
            className={classes.textField}
            label="prezime"
          />
          <br />
          <TextField
            className={classes.textField}
            value={this.state["email"]}
            onChange={this.handleChange("email")}
            className={classes.textField}
            label="email"
          />
          <TextField
            className={classes.textField}
            value={this.state["password"]}
            onChange={this.handleChange("password")}
            className={classes.textField}
            label="sifra"
          />
          <br />
          <Button
            variant="contained"
            className={classes.submit}
            onClick={this.addStudent}
          >
            SUBMIT
          </Button>
        </div>
      </Dialog>
    );
  }
}

export default withStyles(styles)(StudentAdder);
