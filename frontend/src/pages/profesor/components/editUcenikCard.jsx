import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ContentCard from "../../../common/content-card/contentCard";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  controls: {
    marginTop: 10,
    marginLeft: "5%"
  },
  controlButton: {
    marginLeft: 10,
    marginTop: 15
  }
});
class EditUcenikCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.student
    };
  }
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
            margin="normal"
          />
          <TextField
            id="standard-name"
            label="Prezime"
            className={classes.textField}
            value={this.state.lastName}
            margin="normal"
          />
          <TextField
            id="standard-name"
            label="Korisničko ime"
            className={classes.textField}
            value={this.state.email}
            margin="normal"
          />
          <TextField
            id="standard-name"
            label="Šifra"
            className={classes.textField}
            value={this.state.password}
            margin="normal"
          />
        </div>
        <div className={classes.controls}>
          <Button
            className={classes.controlButton}
            variant="raised"
            color="primary"
          >
            Promijeni
          </Button>
          <Button
            className={classes.controlButton}
            variant="raised"
            color="secondary"
          >
            Odustani
          </Button>
        </div>
      </ContentCard>
    );
  }
}

export default withStyles(styles)(EditUcenikCard);
