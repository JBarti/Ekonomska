import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ContentCard from "../../../common/content-card/contentCard";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import {
  updateStudent,
  removeStudent
} from "../../../actions/proffesorActions";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  controls: {
    marginTop: 10,
    marginLeft: "2%"
  },
  controlButton: {
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 15
  }
});
class EditUcenikCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.student
    };
  }

  updateStudentData = () => {
    let { dispatch } = this.props;
    let { id, firstName, lastName, password, email } = this.state;
    console.log(this.state);
    dispatch(updateStudent(id, firstName, lastName, email, password));
  };

  deleteStudent = () => {
    let { dispatch } = this.props;
    let { id } = this.state;
    dispatch(removeStudent(id));
    this.props.toHome();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { classes } = this.props;
    const { value } = this.state;
    let { student } = this.state;
    return (
      <ContentCard
        elevation={0}
        cardName="Postavke učenika"
        classes={{ root: classes.customCard }}
      >
        <div>
          <TextField
            id="standard-name"
            label="Ime"
            className={classes.textField}
            value={this.state.firstName}
            name="firstName"
            onChange={this.onChange}
            margin="normal"
          />
          <TextField
            id="standard-name"
            label="Prezime"
            className={classes.textField}
            value={this.state.lastName}
            name="lastName"
            onChange={this.onChange}
            margin="normal"
          />
          <TextField
            id="standard-name"
            label="Korisničko ime"
            className={classes.textField}
            value={this.state.email}
            name="email"
            onChange={this.onChange}
            margin="normal"
          />
          <TextField
            id="standard-name"
            label="Šifra"
            className={classes.textField}
            value={this.state.password}
            name="password"
            onChange={this.onChange}
            margin="normal"
          />
        </div>
        <div className={classes.controls}>
          <Button
            className={classes.controlButton}
            variant="raised"
            color="primary"
            onClick={this.updateStudentData}
          >
            Promijeni
          </Button>
          <Button
            className={classes.controlButton}
            variant="fab"
            size="medium"
            color="gray"
            onClick={this.deleteStudent}
          >
            <DeleteIcon />
          </Button>
        </div>
      </ContentCard>
    );
  }
}

export default connect()(withStyles(styles)(EditUcenikCard));
