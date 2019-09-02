import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ContentCard from "../../../common/content-card/contentCard";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListButtom from "../../../common/list-button/listButton";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Collapse from "@material-ui/core/Collapse";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconBook from "@material-ui/icons/Book";
import IconQA from "@material-ui/icons/QuestionAnswer";
import IconQuiz from "@material-ui/icons/School";
import External from "./external";
import StudentForms from "./forms";
import Quiz from "./quiz";
const drawerWidth = 240;

const styles = theme => ({
  dialog: {
    overflow: "hidden",
    zIndex: 2000
  },
  cardTitle: {
    paddingLeft: 90,
    marginTop: "15%",
    textAlign: "right",
    marginRight: "10%",
    fontSize: 24
  },
  cardSubtitle: {
    marginTop: "2%",
    textAlign: "right",
    marginRight: "10%",
    marginLeft: "23%",
    width: "70%",
    fontSize: 16,
    opacity: 0.6
  },
  square: {
    transform: "rotate(45deg);",
    position: "absolute",
    width: 150,
    height: 150,
    top: -60,
    left: -40,
    backgroundColor: "#f50057",
    opacity: 0.9
  },
  circle: {
    position: "absolute",
    width: 100,
    height: 100,
    top: 70,
    left: -20,
    borderRadius: "100%",
    backgroundColor: "rgba(78,84,200,0.9)",
    opacity: 0.9
  },
  container: {
    marginTop: 10,
    flex: "0 0 350px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);",
    marginRight: "20px",
    "&:last-child": {
      marginRight: "20px"
    }
  },
  containerChildren: {
    position: "relative",
    display: "inline"
  },
  background: {
    position: "absolute",
    right: 10,
    bottom: 10
  },
  root: {
    display: "flex",
    overflowX: "hidden",
    height: "100%",
    maxWidth: "100%"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    textDecoration: "underline",
    marginRight: drawerWidth,
    color: "black",
    backgroundColor: theme.palette.background.default,
    textAlign: "center"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    background: "rgba(78,84,200,1)",
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    width: "78%",
    height: "100%",
    margin: "0 auto"
  },
  contentText: {
    fontSize: 24,
    borderLeftWidth: "5px",
    borderLeftStyle: "solid",
    borderImage:
      "linear-gradient(180deg, #f50057 0%, rgba(143,148,251,1) 100%) 1 100%",
    paddingLeft: 15,
    maxWidth: "60%",
    margin: "0 auto"
  },
  contentTitle: {
    paddingBottom: 25,
    paddingTop: 25,
    color: "black",
    textAlign: "center"
  },
  lekcijaIme: {
    padding: 10,
    color: "gray"
  },
  buttonText: {
    color: "white"
  },
  appbarTitle: {
    paddingLeft: 10
  },
  landingTxt: {
    textAlign: "center",
    marginTop: "15%"
  }
});

const startingScreen = (classes, lekcija) => (
  <div>
    <Typography className={classes.contentTitle} variant="display2">
      {lekcija ? lekcija.name : ""}
    </Typography>
    <Typography className={classes.contentText} paragraph>
      {lekcija ? lekcija.description : ""}
    </Typography>
  </div>
);

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class LekcijaCard extends Component {
  state = {
    open: false,
    drawer: {
      file: false,
      test: false,
      quiz: false
    },
    content: startingScreen(this.props.classes, {
      name: this.props.folder.name,
      description: this.props.folder.description
    })
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  openDrawer = name => () => {
    let drawer = { ...this.state.drawer };
    drawer[name] = !drawer[name];
    this.setState({ drawer: drawer });
    console.log(this.state);
  };

  handleClose = () => {
    this.setState({ open: false, content: startingScreen(this.props.classes) });
    this.setState({
      content: startingScreen(this.props.classes, {
        name: this.props.folder.name,
        description: this.props.folder.description
      })
    });
  };

  showFile = file => () => {
    window.open(file.url, "_blank");
  };

  showTest = test => () => {
    this.setState({
      content: (
        <StudentForms
          test={test}
          studentId={this.props.studentId}
          handleClose={this.handleClose}
        />
      )
    });
  };

  nameShortener = fileName => {
    let newName = fileName.split(".")[0];
    if (newName.length > 14) {
      newName = newName.slice(0, 10) + "...";
    }
    return newName;
  };

  showQuiz = quiz => () => {
    this.setState({
      content: (
        <Quiz
          test={quiz}
          studentId={this.props.studentId}
          handleClose={this.handleClose}
        />
      )
    });
  };

  render() {
    const { classes, folder, solvedTests } = this.props;
    const { name, description, tests, files } = folder;
    const { drawer } = this.state;
    return (
      <ContentCard
        classes={{
          root: classes.container,
          children: classes.containerChildren
        }}
      >
        <div className={classes.circle} />
        <div className={classes.square} />
        <div className={classes.cardTitle}>{name}</div>
        <div className={classes.cardSubtitle}>{description}</div>
        <div>
          <Button
            variant="outlined"
            classes={{ label: classes.lekcijaIme, root: classes.background }}
            onClick={this.handleClickOpen}
            style={{ padding: 0 }}
          >
            pregled
          </Button>
        </div>
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
                  className={classes.appbarTitle}
                >
                  {name} - {description}
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
              <List>
                <ListButtom
                  primary={"Fileovi"}
                  classes={{ text: classes.buttonText }}
                  iconColor="white"
                  icon={<IconBook />}
                  onClick={this.openDrawer("file")}
                />
                <Collapse in={drawer.file}>
                  {files.map(file => (
                    <ListButtom
                      primary={this.nameShortener(file.name)}
                      classes={{ text: classes.buttonText }}
                      onClick={this.showFile(file)}
                      tabbed={true}
                      icon={<div />}
                    />
                  ))}
                </Collapse>
                <ListButtom
                  primary={"Testovi"}
                  classes={{ text: classes.buttonText }}
                  iconColor="white"
                  icon={<IconQA />}
                  onClick={this.openDrawer("test")}
                />
                <Collapse in={drawer.test}>
                  {tests
                    .filter(test => !test.isQuiz)
                    .map(test => (
                      <ListButtom
                        disabled={solvedTests.includes(test.id) || !test.locked}
                        primary={this.nameShortener(test.name)}
                        classes={{ text: classes.buttonText }}
                        iconColor="white"
                        icon={<div />}
                        onClick={this.showTest(test)}
                        tabbed={true}
                      />
                    ))}
                </Collapse>
                <ListButtom
                  primary={"Kvizovi"}
                  classes={{ text: classes.buttonText }}
                  iconColor="white"
                  icon={<IconQuiz />}
                  onClick={this.openDrawer("quiz")}
                />
                <Collapse in={drawer.quiz}>
                  {tests
                    .filter(test => test.isQuiz)
                    .map(test => (
                      <ListButtom
                        disabled={solvedTests.includes(test.id) || !test.locked}
                        primary={this.nameShortener(test.name)}
                        classes={{ text: classes.buttonText }}
                        iconColor="white"
                        icon={<div />}
                        onClick={this.showQuiz(test)}
                        tabbed={true}
                      />
                    ))}
                </Collapse>
              </List>
            </Drawer>
          </div>
        </Dialog>
      </ContentCard>
    );
  }
}
LekcijaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LekcijaCard);
