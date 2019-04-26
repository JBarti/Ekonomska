import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Visibility from "@material-ui/icons/Visibility";
import UserIcon from "@material-ui/icons/Person";
import NoteAdd from "@material-ui/icons/NoteAdd";
import ListButton from "../../../common/list-button/listButton";
import { connect } from "react-redux";
import { selectGrade } from "../../../actions/proffesorActions";
import AddNewUcenik from "./addNewUcenik";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import EditIcon from "@material-ui/icons/Edit";
import EditUcenikCard from "./editUcenikCard";
import UcenikTests from "./ucenikTests";

const drawerWidth = 240;

const styles = theme => ({
  dialog: {
    overflow: "hidden",
    zIndex: 2000
  },
  container: {
    width: "20%",
    height: "20%"
  },
  background: {
    background: "linear-gradient(135deg, #C33764 0%, #252E73 100%)",
    width: "100%",
    height: "100%",
    overflowX: "hidden",
    overflowY: "hidden"
  },
  root: {
    display: "flex",
    padding: 15,
    overflowX: "hidden",
    maxWidth: "100%"
  },
  cardDiv: {
    width: "100%",
    boxSizing: "content-box",
    overflow: "hidden",
    padding: "1%",
    zIndex: 0
  },
  lekcijaIme: {
    color: "white",
    lineHeight: "100%",
    verticalAlign: "middle"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    textDecoration: "underline",
    marginRight: drawerWidth,
    color: "black",
    backgroundColor: theme.palette.background.default,
    textAlign: "center",
    boxShadow: "0px 7px 50px 0px rgba(255,255,255,1)"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    background: "linear-gradient(180deg, #C33764 0%, #252E73 100%)",
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    width: "78%",
    margin: "0 auto",
    height: "87.5%"
  },
  contentText: {
    fontSize: 24,
    borderLeftWidth: "3px",
    borderLeftStyle: "solid",
    borderImage: "linear-gradient(180deg, #C33764 0%, #252E73 100%) 1 100%",
    paddingLeft: 15
  },
  contentTitle: {
    paddingBottom: 25,
    color: "black"
  },
  buttonText: {
    color: "white"
  },
  homePage: {
    marginTop: 100
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function HomePage(props) {
  const { classes, grade } = props;
  return (
    <div className={classes.homePage}>
      <Typography align="center" variant="display3">
        Popis učenika {grade}
      </Typography>
      <Typography align="center" variant="headline">
        Odaberite učenika da pristupite njegovim podatcima
      </Typography>
    </div>
  );
}

class LekcijaCard extends Component {
  homePage = (
    <HomePage classes={this.props.classes} grade={this.props.grade.name} />
  );
  state = {
    open: false,
    content: this.homePage
  };

  getTests = () => {
    let { folders } = this.props.grade;
    let tests = [];
    folders.forEach(folder => {
      tests.push(...folder.tests);
    });
    return tests;
  };

  showStudentData = student => () => {
    this.handleClose();
    setTimeout(this.handleClickOpen, 410);
    setTimeout(() => {
      this.setState({
        content: (
          <div>
            <EditUcenikCard student={student} toHome={this.toHome} />
            <UcenikTests
              solutions={student.solutions || []}
              tests={this.getTests()}
            />
          </div>
        )
      });
    }, 420);
  };

  toHome = () => {
    this.handleClose();
    setTimeout(this.handleClickOpen, 410);
    setTimeout(() => {
      this.setState({
        content: (
          <HomePage
            classes={this.props.classes}
            grade={this.props.grade.name}
          />
        )
      });
    }, 420);
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    setTimeout(() => {
      this.setState({ content: this.homePage });
    }, 100);
  };

  selectGrade = gradeId => () => {
    this.props.dispatch(selectGrade(gradeId));
  };

  render() {
    const { classes } = this.props;
    const { name, students, id } = this.props.grade;
    return (
      <div>
        <ListItem button onClick={this.selectGrade(id)}>
          <ListItemText primary={name} />
          <ListItemSecondaryAction onClick={this.handleClickOpen}>
            <IconButton aria-label="Delete">
              <Visibility />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Dialog
          classes={{ paper: classes.dialog }}
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <div className={classes.root}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  onClick={this.handleClose}
                  aria-label="Close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.flex}
                >
                  {name}
                </Typography>
              </Toolbar>
            </AppBar>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              {this.state.content}
            </main>
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{ paper: classes.drawerPaper }}
              anchor="right"
            >
              <div className={classes.toolbar} />
              <Divider />
              <List>
                {students.map(student => {
                  return (
                    <ListButton
                      primary={student.firstName + " " + student.lastName}
                      classes={{ text: classes.buttonText }}
                      iconColor="white"
                      icon={<UserIcon />}
                      onClick={this.showStudentData(student)}
                    >
                      <ListItemSecondaryAction>
                        <IconButton aria-label="Edit">
                          <EditIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListButton>
                  );
                })}
                <AddNewUcenik gradeId={id} />
                <ListButton
                  classes={{ text: classes.buttonText }}
                  primary="Pokreni sljedeci korak"
                  iconColor="white"
                  icon={<NoteAdd />}
                />
              </List>
            </Drawer>
          </div>
        </Dialog>
      </div>
    );
  }
}
LekcijaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(store => {
  return {
    grades: store.grades || [],
    all: store.grades.all || []
  };
})(withStyles(styles)(LekcijaCard));
