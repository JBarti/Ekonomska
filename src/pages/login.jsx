import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ContentCard from "../common/content-card/contentCard";
import wallpaper from "../images/wallpaper.jpg";
import TextField from "@material-ui/core/TextField";
import { Typography, Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { loadStudent, registerStudent } from "../actions/studentActions";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
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
      marginTop: 2,
      marginLeft: "15%",
      marginRight: "15%"
    },
    inputLabel: {
      marginTop: "5%",
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
    this.state = { isRegister: false };
    this.regHandleClick = this.regHandleClick.bind(this);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  login = () => {
    const { dispatch } = this.props;
    dispatch({ type: "LOAD_USER_PENDING" });
    loadStudent(this.state.email, this.state.password)
      .payload.then(({ data }) => {
        if (data.type === "student") {
          this.setState({ redirect: <Redirect to="/ucenik" /> });
          dispatch({ type: "LOAD_STUDENT_FULFILLED", payload: data });
        } else {
          this.setState({ redirect: <Redirect to="/profesor" /> });
          dispatch({ type: "LOAD_PROFFESOR_FULFILLED", payload: data });
        }
      })
      .catch(err => {
        dispatch({ type: "LOAD_USER_FAILED", payload: err });
        console.error(err);
        this.setState({ error: true });
      });
  };
  register = () => {
    const { dispatch } = this.props;
    dispatch(
      registerStudent(
        this.state.name,
        this.state.surname,
        this.state.email,
        this.state.password
      )
    );
    dispatch({ type: "REGISER_STUDENT_PENDING" });
    loadStudent(this.state.email, this.state.password)
      .payload.then(({ data }) => {
        this.setState({ redirect: <Redirect to="/ucenik" /> });
        dispatch({ type: "REGISTER_STUDENT_FULFILLED", payload: data });
      })
      .catch(err => {
        dispatch({ type: "LOAD_USER_FAILED", payload: err });
        console.error(err);
        this.setState({ error: true });
      });
  };

  regHandleClick() {
    this.setState(state => ({
      isRegister: !state.isRegister
    }));
  }

  render() {
    const { classes } = this.props;
    if (this.state.isRegister) {
      return (
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
            <InputLabel htmlFor="razred" className={classes.inputLabel}>
              Razred
            </InputLabel>
            <Select
              value={this.state.razred}
              onChange={this.handleChange}
              label="Razred"
              className={classes.textField}
              inputProps={{
                name: "razred",
                id: "razred"
              }}
            >
              <MenuItem value={"A"}>4.A</MenuItem>
              <MenuItem value={"B"}>4.B</MenuItem>
              <MenuItem value={"C"}>4.C</MenuItem>
            </Select>
            <Button
              variant="contained"
              color="primary"
              className={classes.buttonSubmit}
              onClick={this.register}
            >
              SUBMIT
            </Button>
          </ContentCard>
          {this.state.redirect}
          <div className={classes.bottomLine}>
            <Button className={classes.regProf} onClick={this.regHandleClick}>
              {this.state.isRegister ? "Prijava" : "Registriraj se"}
            </Button>
          </div>
        </form>
      );
    }
    return (
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
              Prijava:
            </Typography>
          </div>
          <Typography variant="caption" className={classes.errorCaption}>
            {this.state.errorMessage}
          </Typography>
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
            onClick={this.login}
          >
            SUBMIT
          </Button>
        </ContentCard>
        {this.state.redirect}
        <div className={classes.bottomLine}>
          <Button className={classes.regProf} onClick={this.regHandleClick}>
            {this.state.isRegister ? "Prijava" : "Registriraj se"}
          </Button>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect()(withStyles(styles)(Login));
