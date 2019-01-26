import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ContentCard from "../common/content-card/contentCard";
import wallpaper from "../images/wallpaper.jpg";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { loadStudent } from "../actions/studentActions";
import { Redirect } from "react-router";

const styles = theme => {
  console.log(theme);
  return {
    page: {
      display: "flex",
      positin: "relative",
      flexDirection: "row",
      width: "100vw",
      height: "100vh",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "black",
      backgroundImage: `url(${wallpaper})`,
      backgroundSize: "cover"
    },
    formCard: {
      width: 400,
      height: "fit-content",
      display: "flex",
      flexDirection: "column"
    },
    cardChildren: {
      flexDirection: "column"
    },
    loginTitleContainer: {
      width: "100%",
      borderLeft: `4px ${theme.palette.primary.main} solid`,
      marginTop: "4%"
    },
    loginTitle: {
      width: "100%",
      textAlign: "left",
      paddingLeft: 32
    },
    textField: {
      marginLeft: "15%",
      marginRight: "15%"
    },
    errorCaption: {
      marginLeft: "15%",
      textAlign: "left",
      marginTop: 24,
      marginBottom: -10,
      color: theme.palette.error.main
    },
    buttonSubmit: {
      marginRight: "15%",
      marginLeft: "60%",
      marginTop: 24,
      marginBottom: "10%"
    },
    regProf: {
      position: "absolute",
      bottom: 10,
      right: 15,
      color: "white"
    },
    bottomLine: {
      position: "absolute",
      width: "100%",
      height: "3.33vw",
      bottom: 0,
      backgroundColor: "#303F9F"
    }
  };
};




class Login extends Component {
  state = { redirect: undefined };
   
  constructor(props) {
    super(props);
   this.state = {isRegister: false};
   this.regHandleClick = this.regHandleClick.bind(this);
   }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submit = () => {
    this.props.dispatch(loadStudent(this.state.email, this.state.password));
    this.setState({ redirect: <Redirect to="/ucenik" /> });
  };
  regHandleClick() {
    this.setState(state => ({
      isRegister: !state.isRegister
    }));
  }

  render() {
    const { classes } = this.props;
   if(this.state.isRegister){ return (
      <form className={classes.page}>
        <ContentCard
          classes={{ root: classes.formCard, children: classes.cardChildren }}
        >
          <div className={classes.loginTitleContainer}>
            <Typography
              color="primary"
              className={classes.loginTitle}
              variant="display1"
            >
              Registracija:
            </Typography>
          </div>
          <Typography variant="caption" className={classes.errorCaption}>
            {this.state.errorMessage}
          </Typography>
          <TextField
            label="Ime"
            name="name"
            className={classes.textField}
            value={this.state["name"]}
            onChange={this.handleChange}
            margin="normal"
          />
          <TextField
            label="Prezime"
            name="surname"
            className={classes.textField}
            value={this.state["surname"]}
            onChange={this.handleChange}
            margin="normal"
          />
           <TextField
            label="Korisničko ime"
            name="email"
            className={classes.textField}
            value={this.state["email"]}
            onChange={this.handleChange}
            margin="normal"
          />
          <TextField
            label="Lozinka"
            name="password"
            className={classes.textField}
            value={this.state["password"]}
            onChange={this.handleChange}
            margin="normal"
            type="password"
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.buttonSubmit}
            onClick={this.submit}
          >
            SUBMIT
          </Button>
        </ContentCard>
        {this.state.redirect}
        <div className={classes.bottomLine}>
        <Button className={classes.regProf} onClick={this.regHandleClick}>
               {this.state.isRegister ? 'Prijava' : 'Registriraj se'}
        </Button>
        </div>
      </form> 
   
    );}return( <form className={classes.page}>
      <ContentCard
        classes={{ root: classes.formCard, children: classes.cardChildren }}
      >
        <div className={classes.loginTitleContainer}>
          <Typography
            color="primary"
            className={classes.loginTitle}
            variant="display1"
          >
            Prijava:
          </Typography>
        </div>
        <Typography variant="caption" className={classes.errorCaption}>
          {this.state.errorMessage}
        </Typography>
        <TextField
          label="E-mail"
          name="email"
          className={classes.textField}
          value={this.state["email"]}
          onChange={this.handleChange}
          margin="normal"
        />
        <TextField
            label="Lozinka"
            name="password"
            className={classes.textField}
            value={this.state["password"]}
            onChange={this.handleChange}
            margin="normal"
            type="password"
          />
        <Button
          variant="contained"
          color="primary"
          className={classes.buttonSubmit}
          onClick={this.submit}
        >
          SUBMIT
        </Button>
      </ContentCard>
      {this.state.redirect}
      <div className={classes.bottomLine}>
        <Button className={classes.regProf} onClick={this.regHandleClick}>
               {this.state.isRegister ? 'Prijava' : 'Registriraj se'}
        </Button>
        </div>
    </form> );

  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect()(withStyles(styles)(Login));
